import { Request, Response } from 'express';
import { TodoService } from './todo.service';
import { sendSuccess, sendCreated, sendNoContent } from '../../utils/response';
import { asyncHandler } from '../../middleware/errorHandler';
import {
  createTodoSchema,
  updateTodoSchema,
  todoIdSchema,
  todoQuerySchema,
} from './todo.validation';

/**
 * Controller for todo endpoints.
 * Handles HTTP concerns, delegates logic to service.
 */
export class TodoController {
  private service: TodoService;

  constructor() {
    this.service = new TodoService();
  }

  /**
   * GET /api/todos
   * Get all todos with optional filtering and sorting.
   * Query params: status, categoryId, sortBy, order
   */
  getAll = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    // Validate and parse query parameters
    const queryParams = todoQuerySchema.parse(req.query);
    const todos = await this.service.getAllTodos(queryParams);
    sendSuccess(res, todos);
  });

  /**
   * GET /api/todos/statistics
   * Get todo statistics (total, active, completed counts).
   */
  getStatistics = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
    const stats = await this.service.getStatistics();
    sendSuccess(res, stats);
  });

  /**
   * GET /api/todos/:id
   * Get a specific todo by ID.
   */
  getById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = todoIdSchema.parse(req.params);
    const todo = await this.service.getTodoById(id);
    sendSuccess(res, todo);
  });

  /**
   * POST /api/todos
   * Create a new todo.
   */
  create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const data = createTodoSchema.parse(req.body);
    const todo = await this.service.createTodo(data);
    sendCreated(res, todo);
  });

  /**
   * PUT /api/todos/:id
   * Update an existing todo.
   */
  update = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = todoIdSchema.parse(req.params);
    const data = updateTodoSchema.parse(req.body);
    const todo = await this.service.updateTodo(id, data);
    sendSuccess(res, todo);
  });

  /**
   * PATCH /api/todos/:id/toggle
   * Toggle the completed status of a todo.
   * Convenience endpoint for quick status changes.
   */
  toggleComplete = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = todoIdSchema.parse(req.params);
    
    // Get current todo to determine new status
    const currentTodo = await this.service.getTodoById(id);
    const todo = await this.service.updateTodo(id, {
      completed: !currentTodo.completed,
    });
    
    sendSuccess(res, todo);
  });

  /**
   * DELETE /api/todos/:id
   * Delete a todo.
   */
  delete = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = todoIdSchema.parse(req.params);
    await this.service.deleteTodo(id);
    sendNoContent(res);
  });
}

