import { pool } from '../../config/database';
import { Category, CreateCategoryDto, UpdateCategoryDto } from './category.types';

/**
 * Database repository for categories.
 * This layer talks directly to PostgreSQL - keep business logic out of here!
 */
export class CategoryRepository {
  /**
   * Get all categories, ordered by name.
   * Simple and straightforward - no pagination needed yet.
   */
  async findAll(): Promise<Category[]> {
    const query = `
      SELECT id, name, created_at, updated_at
      FROM categories
      ORDER BY name ASC
    `;

    const result = await pool.query<Category>(query);
    return result.rows;
  }

  /**
   * Find a category by ID.
   * Returns null if not found - let the caller decide how to handle that.
   */
  async findById(id: string): Promise<Category | null> {
    const query = `
      SELECT id, name, created_at, updated_at
      FROM categories
      WHERE id = $1
    `;

    const result = await pool.query<Category>(query, [id]);
    return result.rows[0] || null;
  }

  /**
   * Find a category by name.
   * Useful for checking if a name already exists.
   */
  async findByName(name: string): Promise<Category | null> {
    const query = `
      SELECT id, name, created_at, updated_at
      FROM categories
      WHERE LOWER(name) = LOWER($1)
    `;

    const result = await pool.query<Category>(query, [name]);
    return result.rows[0] || null;
  }

  /**
   * Create a new category.
   * Returns the created category with its generated ID and timestamps.
   */
  async create(data: CreateCategoryDto): Promise<Category> {
    const query = `
      INSERT INTO categories (name)
      VALUES ($1)
      RETURNING id, name, created_at, updated_at
    `;

    const result = await pool.query<Category>(query, [data.name.trim()]);
    return result.rows[0]!;
  }

  /**
   * Update an existing category.
   * Returns the updated category, or null if not found.
   */
  async update(id: string, data: UpdateCategoryDto): Promise<Category | null> {
    const query = `
      UPDATE categories
      SET name = $1
      WHERE id = $2
      RETURNING id, name, created_at, updated_at
    `;

    const result = await pool.query<Category>(query, [data.name.trim(), id]);
    return result.rows[0] || null;
  }

  /**
   * Delete a category.
   * Returns true if deleted, false if not found.
   */
  async delete(id: string): Promise<boolean> {
    const query = `
      DELETE FROM categories
      WHERE id = $1
    `;

    const result = await pool.query(query, [id]);
    return (result.rowCount ?? 0) > 0;
  }

  /**
   * Check if any todos are using this category.
   * We'll need this to prevent deleting categories that are in use.
   */
  async hasAssociatedTodos(id: string): Promise<boolean> {
    const query = `
      SELECT EXISTS(
        SELECT 1 FROM todos WHERE category_id = $1
      ) as has_todos
    `;

    const result = await pool.query<{ has_todos: boolean }>(query, [id]);
    return result.rows[0]?.has_todos ?? false;
  }
}

