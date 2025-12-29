import { z } from 'zod';

/**
 * Validation schema for creating a todo.
 * Title is required, everything else is optional.
 */
export const createTodoSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters')
    .trim()
    .refine((title) => title.length > 0, {
      message: 'Title cannot be empty or just whitespace',
    }),

  description: z
    .string()
    .max(2000, 'Description must be less than 2000 characters')
    .trim()
    .optional()
    .nullable(),

  categoryId: z.string().uuid('Invalid category ID format'),

  dueDate: z
    .string()
    .datetime({ message: 'Due date must be a valid ISO 8601 datetime' })
    .transform((str) => new Date(str))
    .optional()
    .nullable(),
});

/**
 * Validation schema for updating a todo.
 * All fields are optional since this is a partial update.
 */
export const updateTodoSchema = z.object({
  title: z
    .string()
    .min(1, 'Title cannot be empty')
    .max(200, 'Title must be less than 200 characters')
    .trim()
    .optional(),

  description: z
    .string()
    .max(2000, 'Description must be less than 2000 characters')
    .trim()
    .optional()
    .nullable(),

  completed: z.boolean().optional(),

  categoryId: z.string().uuid('Invalid category ID format').optional(),

  dueDate: z
    .string()
    .datetime({ message: 'Due date must be a valid ISO 8601 datetime' })
    .transform((str) => new Date(str))
    .optional()
    .nullable(),
});

/**
 * Validation schema for UUID params.
 */
export const todoIdSchema = z.object({
  id: z.string().uuid('Invalid todo ID format'),
});

/**
 * Validation schema for query parameters.
 * Handles filtering and sorting options.
 */
export const todoQuerySchema = z.object({
  status: z.enum(['all', 'active', 'completed']).optional().default('all'),
  categoryId: z.string().uuid('Invalid category ID format').optional(),
  sortBy: z.enum(['dueDate', 'createdAt']).optional().default('createdAt'),
  order: z.enum(['asc', 'desc']).optional().default('desc'),
});

