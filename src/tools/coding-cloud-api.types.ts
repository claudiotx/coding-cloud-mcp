/**
 * @file Defines types and schemas for Coding Cloud API tool arguments.
 */

import { z } from 'zod';

// Schema for the 'search-code-snippets' tool arguments
export const CodingCloudSearchToolArgsSchema = z.object({
  query: z.string().describe('The search query string to find code snippets.'),
  limit:
    z.number().int().positive().optional().describe('Maximum number of snippets to return (default: 5).'),
});

// TypeScript type inferred from the schema
export type CodingCloudSearchToolArgsType = z.infer<
  typeof CodingCloudSearchToolArgsSchema
>;