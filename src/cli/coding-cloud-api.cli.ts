import { Command } from 'commander';
import { Logger } from '../utils/logger.util.js';
import { handleCliError } from '../utils/error.util.js';

import * as codingCloudApiController from '../controllers/coding-cloud-api.controller.js';

/**
 * Register Coding Cloud API CLI commands
 * @param program The Commander program instance
 */
function register(program: Command) {
  const cliLogger = Logger.forContext('cli/coding-cloud-api.cli.ts', 'register');
  cliLogger.debug(`Registering Coding Cloud API CLI commands...`);

  program
    .command('search-code')
    .description(
      `Search for code snippets using the Coding Cloud API.

      PURPOSE: Find relevant code examples or snippets based on a natural language query.
      
      Use Case: Quickly find code implementations, usage examples, or solutions to programming problems.
      
      Output: Formatted Markdown containing the top code snippets found, including title/identifier and code content.
      
      Examples:
$ mcp-coding-cloud search-code "python dictionary example"
$ mcp-coding-cloud search-code "React useState hook" --limit 3`,
    )
    .argument('<query>', 'The search query string.')
    .option('-l, --limit <number>', 'Maximum number of results to return', (value) => parseInt(value, 10))
    .action(async (query: string, options: { limit?: number }) => {
      const actionLogger = Logger.forContext('cli/coding-cloud-api.cli.ts', 'search-code:action');
      actionLogger.info(`Executing search-code command...`);
      actionLogger.debug(`Query: ${query}, Options: ${JSON.stringify(options)}`);

      try {
        // Map CLI arguments to controller options
        const controllerOptions = {
          limit: options.limit,
        };

        // Call the controller
        const result = await codingCloudApiController.searchSnippets(query, controllerOptions);
        
        // Display the output
        console.log(result.content);
      } catch (error) {
        actionLogger.error(`Error searching code snippets for query: ${query}`, error);
        handleCliError(error);
      }
    });

  cliLogger.debug('Coding Cloud API CLI commands registered.');
}

export default { register };
