import { fetchApi } from '../utils/transport.util';
import { Logger } from '../utils/logger.util';
import {
  createUnexpectedError,
  McpError,
} from '../utils/error.util';
import type {
  CodingCloudApiResponse,
  Snippet,
} from './coding-cloud-api.types';

const serviceLogger = Logger.forContext('services/coding-cloud-api.service.ts');
const CODING_CLOUD_API_BASE_URL = 'https://www.coding-cloud.com/api';

serviceLogger.debug('Coding Cloud API service initialized');

async function searchSnippets(
  query: string,
  limit: number,
): Promise<Snippet[]> {
  const methodLogger = Logger.forContext(
    'services/coding-cloud-api.service.ts',
    'searchSnippets',
  );
  methodLogger.debug(`Calling Coding Cloud API for query: "${query}", limit: ${limit}`);

  const url = new URL(`${CODING_CLOUD_API_BASE_URL}/snippets`);
  url.searchParams.append('query', query);
  url.searchParams.append('limit', String(limit));
  // Assuming page=1 is the default or desired behavior for now
  url.searchParams.append('page', '1');

  try {
    const data = await fetchApi<CodingCloudApiResponse>(url.toString(), {
      method: 'GET',
    });

    methodLogger.debug(`Received successful data from Coding Cloud API`);
    return data.snippets || []; // Return snippets or empty array if data is missing
  } catch (error) {
    methodLogger.error(`Service error fetching snippet data`, error);

    if (error instanceof McpError) {
      throw error;
    }

    throw createUnexpectedError(
      'Unexpected service error while fetching snippet data',
      error,
    );
  }
}

export {
    searchSnippets,
};