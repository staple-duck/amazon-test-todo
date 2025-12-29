import { z } from 'zod';

/**
 * Validation schema for creating a category.
 * Name must be 1-100 characters and can't be just whitespace.
 */
export const createCategorySchema = z.object({
  name: z
    .string()
    .min(1, 'Category name is required')
    .max(100, 'Category name must be less than 100 characters')
    .trim()
    .refine((name) => name.length > 0, {
      message: 'Category name cannot be empty or just whitespace',
    }),
});

/**
 * Validation schema for updating a category.
 * Same rules as creation - keep it simple.
 */
export const updateCategorySchema = z.object({
  name: z
    .string()
    .min(1, 'Category name is required')
    .max(100, 'Category name must be less than 100 characters')
    .trim()
    .refine((name) => name.length > 0, {
      message: 'Category name cannot be empty or just whitespace',
    }),
});

/**
 * Validation schema for UUID params.
 * Makes sure we're getting a valid UUID before hitting the database.
 */
export const categoryIdSchema = z.object({
  id: z.string().uuid('Invalid category ID format'),
});

