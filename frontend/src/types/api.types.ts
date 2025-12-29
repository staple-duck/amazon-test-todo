/**
 * TypeScript types matching the backend API.
 * Keep these in sync with backend types!
 */

/**
 * Category entity.
 */
export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * DTO for creating a category.
 */
export interface CreateCategoryDto {
  name: string;
}

/**
 * DTO for updating a category.
 */
export interface UpdateCategoryDto {
  name: string;
}

/**
 * Todo entity.
 */
export interface Todo {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  dueDate: string | null;
  categoryId: string;
  categoryName?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * DTO for creating a todo.
 */
export interface CreateTodoDto {
  title: string;
  description?: string | null;
  categoryId: string;
  dueDate?: string | null;
}

/**
 * DTO for updating a todo.
 */
export interface UpdateTodoDto {
  title?: string;
  description?: string | null;
  completed?: boolean;
  categoryId?: string;
  dueDate?: string | null;
}

/**
 * Query parameters for fetching todos.
 */
export interface TodoQueryParams {
  status?: 'all' | 'active' | 'completed';
  categoryId?: string;
  sortBy?: 'dueDate' | 'createdAt';
  order?: 'asc' | 'desc';
}

/**
 * Todo statistics.
 */
export interface TodoStatistics {
  total: number;
  active: number;
  completed: number;
}

/**
 * API error response.
 */
export interface ApiError {
  status: 'error';
  message: string;
  errors?: Array<{ field: string; message: string }>;
}

/**
 * API success response wrapper.
 */
export interface ApiResponse<T> {
  status: 'success';
  data: T;
}

