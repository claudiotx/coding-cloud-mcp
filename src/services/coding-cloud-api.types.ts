export interface Snippet {
  id: string;
  language: string;
  code: string;
  description?: string;
  title?: string; // Added from API response
  rating?: number; // Added from API response (replaces score)
  views?: number; // Added from API response
  tags?: string[]; // Added from API response
  slug?: string; // Added from API response (replaces path)
  type?: string; // Added from API response
  postedAt?: string; // Added from API response
}

export interface CodingCloudApiResponse {
  status: 'success' | 'error';
  message?: string;
  snippets: Snippet[]; // Added from API response
  hasMore: boolean; // Added from API response
  total?: number;
  page?: number;
  limit?: number;
}

export interface CodingCloudRequestOptions {
  // Placeholder for future options like API keys or headers
}