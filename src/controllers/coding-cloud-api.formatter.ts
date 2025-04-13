/**
 * @file Formatter functions for Coding Cloud API controller responses.
 */

import type { Snippet } from '../services/coding-cloud-api.types.js';
import { Logger } from '../utils/logger.util.js';

const formatterLogger = Logger.forContext(
  'controllers/coding-cloud-api.formatter.ts',
);

export function formatSnippets(snippets: Snippet[]): string {
  formatterLogger.debug(`Formatting ${snippets.length} snippets...`);

  if (!snippets || snippets.length === 0) {
    return 'No relevant code snippets found.';
  }

  const formatted = snippets
    .map((snippet, index) => {
      // Basic Markdown formatting - enhance as needed
      let content = `### Snippet ${index + 1}: ${snippet.title || snippet.slug || 'Unknown Title'}\n`;
      content += `**Rating:** ${(snippet.rating || 0).toFixed(2)}\n`;
      content += '```' + (snippet.language || '') + '\n';
      content += snippet.code;
      content += '\n```\n';
      return content;
    })
    .join('\n---\n'); // Separator between snippets

  formatterLogger.debug('Finished formatting snippets.');
  return formatted;
}