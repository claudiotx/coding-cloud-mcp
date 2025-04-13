/**
 * @file Registers and handles the Coding Cloud API tool(s) for the MCP server.
 */
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { RequestHandlerExtra } from '@modelcontextprotocol/sdk/shared/protocol.js';
import { Logger } from '../utils/logger.util.js';
import { formatErrorForMcpTool } from '../utils/error.util.js';
import * as codingCloudApiController from '../controllers/coding-cloud-api.controller.js';
import {
  CodingCloudSearchToolArgsSchema,
  CodingCloudSearchToolArgsType,
} from './coding-cloud-api.types.js';
import { SearchSnippetsOptions } from '../controllers/coding-cloud-api.types.js';


async function searchCodeSnippets(
  args: CodingCloudSearchToolArgsType,
  _extra: RequestHandlerExtra,
): Promise<{ content: Array<{ type: 'text', text: string }> }> {
  const methodLogger = Logger.forContext(
    'tools/coding-cloud-api.tool.ts',
    'searchCodeSnippets',
  );
  methodLogger.debug(`Executing tool with args:`, args);

  try {
    // Map tool args to controller options
    const controllerOptions: SearchSnippetsOptions = {
      limit: args.limit, // Pass limit directly, controller applies default if undefined
    };

    // Call the controller
    const result = await codingCloudApiController.searchSnippets(
      args.query,
      controllerOptions,
    );

    methodLogger.debug('Controller returned success:', result.content);
    // Format the successful response for the MCP
    return { 
      content: [
        { 
          type: 'text' as const, 
          text: result.content 
        }
      ] 
    };
  } catch (error) {
    // Log the error
    methodLogger.error(
      `Error searching code snippets for query: ${args.query}`,
      error
    );
    // Format the error for MCP tool response instead of re-throwing
    return formatErrorForMcpTool(error);
  }
}

function registerTools(server: McpServer) {
  const methodLogger = Logger.forContext(
    'tools/coding-cloud-api.tool.ts',
    'registerTools',
  );
  methodLogger.debug(`Registering Coding Cloud API tools...`);

  server.tool(
    'search-code-snippets',
    `Search for relevant code snippets using the Coding Cloud API.

            PURPOSE:
            Finds code examples, solutions, or documentation snippets based on a natural language query.

            WHEN TO USE:
            - To find example code for a specific task or library.
            - To search for documentation related to a programming concept or API.
            - When looking for quick solutions or patterns for a coding problem.

            WHEN NOT TO USE:
            - For general web searches not related to code.
            - When searching within a specific, local codebase (use local search tools).

            RETURNS:
            Formatted Markdown containing the top code snippets found, including:
            - Title/Identifier for each snippet.
            - Relevance score/rating (if available).
            - The code content, often with syntax highlighting.

            EXAMPLES:
            - Search for Python dictionary examples: { query: "python dictionary example" }
            - Find top 3 examples for React state management: { query: "React useState hook", limit: 3 }

            ERRORS:
            - API errors: If the external Coding Cloud API service fails or returns an error status.
            - Network errors: If the request to the Coding Cloud API fails due to network issues.
        `,
    CodingCloudSearchToolArgsSchema.shape, // Pass the .shape property
    searchCodeSnippets,
  );

  methodLogger.debug('Coding Cloud API tools registered.');
}

export default { registerTools };