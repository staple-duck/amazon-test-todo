import { Timestamps } from '../../types';

/**
 * Todo entity from database.
 * Represents a single todo item with all its properties.
 */
export interface Todo extends Timestamps {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  dueDate: Date | null;
  categoryId: string;
  categoryName?: string; // Joined from categories table
}

/**
 * Data for creating a new todo.
 * All fields except description and dueDate are required.
 */
export interface CreateTodoDto {
  title: string;
  description?: string | null;
  categoryId: string;
  dueDate?: Date | null;
}

/**
 * Data for updating a todo.
 * All fields are optional - only provided fields will be updated.
 */
export interface UpdateTodoDto {
  title?: string;
  description?: string | null;
  completed?: boolean;
  categoryId?: string;
  dueDate?: Date | null;
}

/**
 * Query parameters for filtering and sorting todos.
 */
export interface TodoQueryParams {
  status?: 'all' | 'active' | 'completed';
  categoryId?: string;
  sortBy?: 'dueDate' | 'createdAt';
  order?: 'asc' | 'desc';
}

/**
 * Filter options for the repository layer.
 */
export interface TodoFilters {
  completed?: boolean;
  categoryId?: string;
}

