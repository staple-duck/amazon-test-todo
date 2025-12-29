/**
 * Common types used throughout the application.
 * Keep these simple and focused - one file per domain concept.
 */

/**
 * Standard API response wrapper.
 * All our endpoints return data in this format for consistency.
 */
export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
  errors?: Array<{ field: string; message: string }>;
}

/**
 * Pagination parameters for list endpoints.
 * We'll use this later for todos/categories lists.
 */
export interface PaginationParams {
  page: number;
  limit: number;
}

/**
 * Standard database timestamps.
 * Every table should have these for audit trails.
 */
export interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}

