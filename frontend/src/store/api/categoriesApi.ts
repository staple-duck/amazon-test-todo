import { baseApi } from './baseApi';
import type {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
  ApiResponse,
} from '@/types/api.types';

/**
 * Categories API endpoints.
 * RTK Query will generate hooks for each endpoint:
 * - useGetCategoriesQuery
 * - useGetCategoryQuery
 * - useCreateCategoryMutation
 * - useUpdateCategoryMutation
 * - useDeleteCategoryMutation
 */
export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Get all categories.
     * Cached with 'Categories' tag.
     */
    getCategories: builder.query<Category[], void>({
      query: () => '/categories',
      transformResponse: (response: ApiResponse<Category[]>) => response.data,
      providesTags: ['Categories'],
    }),

    /**
     * Get a single category by ID.
     */
    getCategory: builder.query<Category, string>({
      query: (id) => `/categories/${id}`,
      transformResponse: (response: ApiResponse<Category>) => response.data,
      providesTags: (_result, _error, id) => [{ type: 'Categories', id }],
    }),

    /**
     * Create a new category.
     * Invalidates 'Categories' tag to refetch the list.
     */
    createCategory: builder.mutation<Category, CreateCategoryDto>({
      query: (body) => ({
        url: '/categories',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApiResponse<Category>) => response.data,
      invalidatesTags: ['Categories'],
    }),

    /**
     * Update an existing category.
     * Invalidates both the list and the specific category.
     */
    updateCategory: builder.mutation<
      Category,
      { id: string; data: UpdateCategoryDto }
    >({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        method: 'PUT',
        body: data,
      }),
      transformResponse: (response: ApiResponse<Category>) => response.data,
      invalidatesTags: (_result, _error, { id }) => [
        'Categories',
        { type: 'Categories', id },
      ],
    }),

    /**
     * Delete a category.
     * Invalidates 'Categories' tag to refetch the list.
     * Also invalidates 'Todos' since they might be affected.
     */
    deleteCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Categories', 'Todos'],
    }),
  }),
});

/**
 * Export generated hooks.
 * These hooks handle loading states, errors, and caching automatically!
 */
export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;

