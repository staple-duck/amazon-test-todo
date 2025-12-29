import { Router } from 'express';
import { CategoryController } from './category.controller';

/**
 * Category routes.
 * All routes are prefixed with /api/categories in the main app.
 */
const router = Router();
const controller = new CategoryController();

// GET /api/categories - Get all categories
router.get('/', controller.getAll);

// GET /api/categories/:id - Get category by ID
router.get('/:id', controller.getById);

// POST /api/categories - Create new category
router.post('/', controller.create);

// PUT /api/categories/:id - Update category
router.put('/:id', controller.update);

// DELETE /api/categories/:id - Delete category
router.delete('/:id', controller.delete);

export default router;

