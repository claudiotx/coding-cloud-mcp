/**
 * @file Controller for interacting with the Coding Cloud API.
 */
import * as codingCloudApiService from '../services/coding-cloud-api.service.js';
import { Logger } from '../utils/logger.util.js';
import { ControllerResponse } from '../types/common.types.js';
import { formatSnippets } from './coding-cloud-api.formatter.js';
import { handleControllerError } from '../utils/error-handler.util.js';
import { applyDefaults } from '../utils/defaults.util.js';
import { SearchSnippetsOptions } from './coding-cloud-api.types.js';

const controllerLogger = Logger.forContext(
  'controllers/coding-cloud-api.controller.ts',
);
controllerLogger.debug('Coding Cloud API controller initialized');

async function searchSnippets(
  query: string,
  options: SearchSnippetsOptions = {},
): Promise<ControllerResponse> {
  const methodLogger = Logger.forContext(
    'controllers/coding-cloud-api.controller.ts',
    'searchSnippets',
  );
  methodLogger.debug(`Searching snippets for query: "${query}"...`);

  try {
    const defaults: Partial<SearchSnippetsOptions> = {
      limit: 5,
    };
    const mergedOptions = applyDefaults<SearchSnippetsOptions>(
      options,
      defaults,
    );
    methodLogger.debug('Using options after defaults:', mergedOptions);

    // Service Call
    const snippets = await codingCloudApiService.searchSnippets(
      query,
      mergedOptions.limit as number,
    );
    methodLogger.debug(`Got ${snippets.length} snippets from the service`);

    const formattedContent = formatSnippets(snippets);

    return { content: formattedContent };
  } catch (error) {
    // Use standardized error handler
    return handleControllerError(error, {
      entityType: 'Code Snippets',
      operation: 'searching',
      source: 'controllers/coding-cloud-api.controller.ts@searchSnippets',
      additionalInfo: { query },
    });
  }
}

export {
  searchSnippets,
};