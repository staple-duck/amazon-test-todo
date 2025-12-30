import { TodoRepository } from './todo.repository';
import { CategoryRepository } from '../categories/category.repository';
import { Todo, CreateTodoDto, UpdateTodoDto, TodoQueryParams } from './todo.types';
import { AppError } from '../../middleware/errorHandler';

/**
 * Business logic layer for todos.
 * Handles validation, business rules, and coordinates between repositories.
 */
export class TodoService {
  private todoRepository: TodoRepository;
  private categoryRepository: CategoryRepository;

  constructor() {
    this.todoRepository = new TodoRepository();
    this.categoryRepository = new CategoryRepository();
  }

  /**
   * Get all todos with filtering and sorting.
   * Handles the different status filters (all/active/completed).
   */
  async getAllTodos(queryParams: TodoQueryParams): Promise<Todo[]> {
    const { status = 'all', categoryId, sortBy = 'createdAt', order = 'desc' } = queryParams;

    // Build filters based on status
    const filters: { completed?: boolean; categoryId?: string } = {};

    if (status === 'active') {
      filters.completed = false;
    } else if (status === 'completed') {
      filters.completed = true;
    }
    // 'all' means no filter on completed status

    if (categoryId) {
      // Verify the category exists
      await this.verifyCategoryExists(categoryId);
      filters.categoryId = categoryId;
    }

    return this.todoRepository.findAll(filters, sortBy, order);
  }

  /**
   * Get a todo by ID.
   * Throws 404 if not found.
   */
  async getTodoById(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findById(id);

    if (!todo) {
      throw new AppError(404, 'Todo not found');
    }

    return todo;
  }

  /**
   * Create a new todo.
   * Validates that the category exists.
   */
  async createTodo(data: CreateTodoDto): Promise<Todo> {
    // Make sure the category exists
    await this.verifyCategoryExists(data.categoryId);

    // Validate due date if provided (should be in the future)
    if (data.dueDate) {
      const now = new Date();

      if (data.dueDate < now) {
        throw new AppError(400, 'Due date and time cannot be in the past');
      }
    }

    return this.todoRepository.create(data);
  }

  /**
   * Update an existing todo.
   * Validates category if it's being changed.
   */
  async updateTodo(id: string, data: UpdateTodoDto): Promise<Todo> {
    // Make sure the todo exists
    await this.getTodoById(id);

    // If changing category, verify new category exists
    if (data.categoryId) {
      await this.verifyCategoryExists(data.categoryId);
    }

    // Validate due date if provided
    if (data.dueDate) {
      const now = new Date();

      if (data.dueDate < now) {
        throw new AppError(400, 'Due date and time cannot be in the past');
      }
    }

    const updated = await this.todoRepository.update(id, data);

    if (!updated) {
      throw new AppError(404, 'Todo not found');
    }

    return updated;
  }

  /**
   * Delete a todo.
   * Simple - no constraints to check.
   */
  async deleteTodo(id: string): Promise<void> {
    // Make sure it exists first
    await this.getTodoById(id);

    await this.todoRepository.delete(id);
  }

  /**
   * Get statistics about todos.
   * Useful for dashboard displays.
   */
  async getStatistics(): Promise<{ total: number; active: number; completed: number }> {
    return this.todoRepository.countByStatus();
  }

  /**
   * Helper method to verify a category exists.
   * Throws 404 if not found.
   */
  private async verifyCategoryExists(categoryId: string): Promise<void> {
    const category = await this.categoryRepository.findById(categoryId);

    if (!category) {
      throw new AppError(404, `Category with ID ${categoryId} not found`);
    }
  }
}

