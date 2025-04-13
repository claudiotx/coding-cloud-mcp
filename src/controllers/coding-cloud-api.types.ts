/**
 * @file Defines the TypeScript types specific to the Coding Cloud API Controller.
 */

import type { Snippet } from '../services/coding-cloud-api.types.js';

/**
 * @interface SearchSnippetsOptions
 * @description Options for the `searchSnippets` controller method.
 * @property {number} [limit=5] - The maximum number of snippets to return. Defaults to 5.
 */
export interface SearchSnippetsOptions {
  limit?: number;
}

/**
 * @interface SearchSnippetsResult
 * @description The result structure expected from the `searchSnippets` controller method, containing the found snippets.
 * @property {Snippet[]} snippets - An array of code snippets found.
 */
export interface SearchSnippetsResult {
  snippets: Snippet[];
}