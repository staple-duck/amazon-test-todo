import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { env } from '@/config/env';

/**
 * Base API configuration using RTK Query.
 * All API endpoints extend from this base.
 * 
 * RTK Query automatically handles:
 * - Caching
 * - Loading states
 * - Error handling
 * - Request deduplication
 * - Cache invalidation
 */
export const baseApi = createApi({
  reducerPath: 'api',
  
  baseQuery: fetchBaseQuery({
    baseUrl: env.apiUrl,
    // Add common headers here if needed
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      // Add auth token here when implementing authentication
      // const token = localStorage.getItem('token');
      // if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),

  /**
   * Tag types for cache invalidation.
   * When we mutate (create/update/delete), we invalidate related tags
   * to automatically refetch fresh data.
   */
  tagTypes: ['Categories', 'Todos', 'TodoStatistics'],

  endpoints: () => ({}), // Endpoints are defined in separate files
});

