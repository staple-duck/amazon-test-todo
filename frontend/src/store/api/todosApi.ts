import { baseApi } from './baseApi';
import type {
  Todo,
  CreateTodoDto,
  UpdateTodoDto,
  TodoQueryParams,
  TodoStatistics,
  ApiResponse,
} from '@/types/api.types';

/**
 * Todos API endpoints.
 * RTK Query will generate hooks for each endpoint:
 * - useGetTodosQuery
 * - useGetTodoQuery
 * - useGetTodoStatisticsQuery
 * - useCreateTodoMutation
 * - useUpdateTodoMutation
 * - useToggleTodoMutation
 * - useDeleteTodoMutation
 */
export const todosApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Get todos with optional filtering and sorting.
     * Query params are passed as an object and converted to URL params.
     */
    getTodos: builder.query<Todo[], TodoQueryParams | void>({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        
        // Only add params that are defined
        if (params.status) searchParams.append('status', params.status);
        if (params.categoryId) searchParams.append('categoryId', params.categoryId);
        if (params.sortBy) searchParams.append('sortBy', params.sortBy);
        if (params.order) searchParams.append('order', params.order);

        const queryString = searchParams.toString();
        return `/todos${queryString ? `?${queryString}` : ''}`;
      },
      transformResponse: (response: ApiResponse<Todo[]>) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Todos' as const, id })),
              { type: 'Todos', id: 'LIST' },
            ]
          : [{ type: 'Todos', id: 'LIST' }],
    }),

    /**
     * Get todo statistics.
     * Useful for displaying counts in the UI.
     */
    getTodoStatistics: builder.query<TodoStatistics, void>({
      query: () => '/todos/statistics',
      transformResponse: (response: ApiResponse<TodoStatistics>) => response.data,
      providesTags: ['TodoStatistics'],
    }),

    /**
     * Get a single todo by ID.
     */
    getTodo: builder.query<Todo, string>({
      query: (id) => `/todos/${id}`,
      transformResponse: (response: ApiResponse<Todo>) => response.data,
      providesTags: (_result, _error, id) => [{ type: 'Todos', id }],
    }),

    /**
     * Create a new todo.
     * Invalidates todos list and statistics.
     */
    createTodo: builder.mutation<Todo, CreateTodoDto>({
      query: (body) => ({
        url: '/todos',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApiResponse<Todo>) => response.data,
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }, 'TodoStatistics'],
    }),

    /**
     * Update an existing todo.
     * Invalidates the specific todo, list, and statistics.
     */
    updateTodo: builder.mutation<Todo, { id: string; data: UpdateTodoDto }>({
      query: ({ id, data }) => ({
        url: `/todos/${id}`,
        method: 'PUT',
        body: data,
      }),
      transformResponse: (response: ApiResponse<Todo>) => response.data,
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Todos', id },
        { type: 'Todos', id: 'LIST' },
        'TodoStatistics',
      ],
    }),

    /**
     * Toggle todo completion status.
     * Convenience endpoint for quick status changes.
     */
    toggleTodo: builder.mutation<Todo, string>({
      query: (id) => ({
        url: `/todos/${id}/toggle`,
        method: 'PATCH',
      }),
      transformResponse: (response: ApiResponse<Todo>) => response.data,
      invalidatesTags: (_result, _error, id) => [
        { type: 'Todos', id },
        { type: 'Todos', id: 'LIST' },
        'TodoStatistics',
      ],
    }),

    /**
     * Delete a todo.
     * Invalidates list and statistics.
     */
    deleteTodo: builder.mutation<void, string>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }, 'TodoStatistics'],
    }),
  }),
});

/**
 * Export generated hooks.
 * Use these in components for automatic data fetching and state management!
 */
export const {
  useGetTodosQuery,
  useGetTodoQuery,
  useGetTodoStatisticsQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useToggleTodoMutation,
  useDeleteTodoMutation,
} = todosApi;

