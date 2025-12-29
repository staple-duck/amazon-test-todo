import { Request, Response, NextFunction } from 'express';
import { CategoryService } from './category.service';
import { sendSuccess, sendCreated, sendNoContent } from '../../utils/response';
import { asyncHandler } from '../../middleware/errorHandler';
import {
  createCategorySchema,
  updateCategorySchema,
  categoryIdSchema,
} from './category.validation';

/**
 * Controller for category endpoints.
 * Handles HTTP request/response, delegates business logic to the service.
 */
export class CategoryController {
  private service: CategoryService;

  constructor() {
    this.service = new CategoryService();
  }

  /**
   * GET /api/categories
   * Get all categories.
   */
  getAll = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
    const categories = await this.service.getAllCategories();
    sendSuccess(res, categories);
  });

  /**
   * GET /api/categories/:id
   * Get a specific category by ID.
   */
  getById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    // Validate the ID format first
    const { id } = categoryIdSchema.parse(req.params);
    const category = await this.service.getCategoryById(id);
    sendSuccess(res, category);
  });

  /**
   * POST /api/categories
   * Create a new category.
   */
  create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    // Validate request body
    const data = createCategorySchema.parse(req.body);
    const category = await this.service.createCategory(data);
    sendCreated(res, category);
  });

  /**
   * PUT /api/categories/:id
   * Update an existing category.
   */
  update = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    // Validate both ID and body
    const { id } = categoryIdSchema.parse(req.params);
    const data = updateCategorySchema.parse(req.body);
    const category = await this.service.updateCategory(id, data);
    sendSuccess(res, category);
  });

  /**
   * DELETE /api/categories/:id
   * Delete a category.
   */
  delete = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = categoryIdSchema.parse(req.params);
    await this.service.deleteCategory(id);
    sendNoContent(res);
  });
}

