import { Timestamps } from '../../types';

/**
 * Category entity from database.
 * Represents a category that todos can be organized into.
 */
export interface Category extends Timestamps {
  id: string;
  name: string;
}

/**
 * Data for creating a new category.
 * Just the name - id and timestamps are generated automatically.
 */
export interface CreateCategoryDto {
  name: string;
}

/**
 * Data for updating an existing category.
 * Only the name can be updated for now.
 */
export interface UpdateCategoryDto {
  name: string;
}

