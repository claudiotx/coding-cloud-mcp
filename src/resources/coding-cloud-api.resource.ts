import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Logger } from '../utils/logger.util.js';
import { formatErrorForMcpResource } from '../utils/error.util.js';

import * as codingCloudApiController from '../controllers/coding-cloud-api.controller.js';

/**
 * Register Coding Cloud API resources with the MCP server
 * @param server The MCP server instance
 */
function registerResources(server: McpServer) {
	const methodLogger = Logger.forContext(
		'resources/coding-cloud-api.resource.ts',
		'registerResources',
	);
	methodLogger.debug(`Registering Coding Cloud API resources...`);

	// Register resource for JavaScript snippets
	server.resource(
		'JavaScript Patterns',
		'coding-cloud://javascript/patterns',
		{
			description:
				'Common JavaScript design patterns and code snippets',
		},
		async (_uri, _extra) => {
			const resourceMethodLogger = Logger.forContext(
				'resources/coding-cloud-api.resource.ts',
				'jsPatternHandler',
			);
			try {
				resourceMethodLogger.debug(
					'Handling request for JavaScript patterns',
				);

				const resourceContent = await codingCloudApiController.searchSnippets(
					'javascript common design patterns',
					{
						limit: 5,
					},
				);

				resourceMethodLogger.debug('Successfully retrieved JavaScript patterns');
				return {
					contents: [
						{
							uri: 'coding-cloud://javascript/patterns',
							text: resourceContent.content,
							mimeType: 'text/plain',
							description:
								'Common JavaScript design patterns and code snippets',
						},
					],
				};
			} catch (error) {
				resourceMethodLogger.error(`Error getting JavaScript patterns`, error);
				return formatErrorForMcpResource(error, 'coding-cloud://javascript/patterns');
			}
		},
	);

	// Register resource for Python snippets
	server.resource(
		'Anthropic API SDK',
		'coding-cloud://anthropic/api/sdk',
		{
			description:
				'Anthropic API SDK Usage',
		},
		async (_uri, _extra) => {
			const resourceMethodLogger = Logger.forContext(
				'resources/coding-cloud-api.resource.ts',
				'Anthropic API',
			);
			try {
				resourceMethodLogger.debug(
					'Anthropic API',
				);

				const resourceContent = await codingCloudApiController.searchSnippets(
					'Anthropic API',
					{
						limit: 5,
					},
				);

				resourceMethodLogger.debug('Successfully retrieved Anthropic API examples');
				return {
					contents: [
						{
							uri: 'coding-cloud://anthropic/api',
							text: resourceContent.content,
							mimeType: 'text/plain',
							description:
								'Anthropic API SDK usage',
						},
					],
				};
			} catch (error) {
				resourceMethodLogger.error(`Error getting Python examples`, error);
				return formatErrorForMcpResource(error, 'coding-cloud://python/examples');
			}
		},
	);
}

export default { registerResources };
