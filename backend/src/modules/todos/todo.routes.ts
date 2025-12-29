import { Router } from 'express';
import { TodoController } from './todo.controller';

/**
 * Todo routes.
 * All routes are prefixed with /api/todos in the main app.
 */
const router = Router();
const controller = new TodoController();

// Statistics endpoint - must come before /:id to avoid conflicts
router.get('/statistics', controller.getStatistics);

// CRUD operations
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

// Convenience endpoint for toggling completion status
router.patch('/:id/toggle', controller.toggleComplete);

export default router;

