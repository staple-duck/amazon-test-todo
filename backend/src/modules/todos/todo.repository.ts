import { pool } from '../../config/database';
import { Todo, CreateTodoDto, UpdateTodoDto, TodoFilters } from './todo.types';

/**
 * Database repository for todos.
 * Handles all direct database operations for todos.
 */
export class TodoRepository {
  /**
   * Get all todos with optional filtering and sorting.
   * Joins with categories to include category name in results.
   */
  async findAll(
    filters?: TodoFilters,
    sortBy: 'dueDate' | 'createdAt' = 'createdAt',
    order: 'asc' | 'desc' = 'desc'
  ): Promise<Todo[]> {
    // Start building the query
    let query = `
      SELECT 
        t.id,
        t.title,
        t.description,
        t.completed,
        t.due_date as "dueDate",
        t.category_id as "categoryId",
        t.created_at as "createdAt",
        t.updated_at as "updatedAt",
        c.name as "categoryName"
      FROM todos t
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE 1=1
    `;

    const params: any[] = [];
    let paramIndex = 1;

    // Add filters dynamically
    if (filters?.completed !== undefined) {
      query += ` AND t.completed = $${paramIndex}`;
      params.push(filters.completed);
      paramIndex++;
    }

    if (filters?.categoryId) {
      query += ` AND t.category_id = $${paramIndex}`;
      params.push(filters.categoryId);
      paramIndex++;
    }

    // Add sorting - handle nulls properly for due_date
    if (sortBy === 'dueDate') {
      // Put nulls at the end regardless of sort order
      query += ` ORDER BY t.due_date ${order === 'asc' ? 'ASC NULLS LAST' : 'DESC NULLS LAST'}`;
    } else {
      query += ` ORDER BY t.created_at ${order.toUpperCase()}`;
    }

    const result = await pool.query<Todo>(query, params);
    return result.rows;
  }

  /**
   * Find a todo by ID with category info.
   */
  async findById(id: string): Promise<Todo | null> {
    const query = `
      SELECT 
        t.id,
        t.title,
        t.description,
        t.completed,
        t.due_date as "dueDate",
        t.category_id as "categoryId",
        t.created_at as "createdAt",
        t.updated_at as "updatedAt",
        c.name as "categoryName"
      FROM todos t
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE t.id = $1
    `;

    const result = await pool.query<Todo>(query, [id]);
    return result.rows[0] || null;
  }

  /**
   * Create a new todo.
   */
  async create(data: CreateTodoDto): Promise<Todo> {
    const query = `
      INSERT INTO todos (title, description, category_id, due_date)
      VALUES ($1, $2, $3, $4)
      RETURNING 
        id,
        title,
        description,
        completed,
        due_date as "dueDate",
        category_id as "categoryId",
        created_at as "createdAt",
        updated_at as "updatedAt"
    `;

    const result = await pool.query<Todo>(query, [
      data.title.trim(),
      data.description?.trim() || null,
      data.categoryId,
      data.dueDate || null,
    ]);

    return result.rows[0]!;
  }

  /**
   * Update an existing todo.
   * Only updates provided fields.
   */
  async update(id: string, data: UpdateTodoDto): Promise<Todo | null> {
    // Build dynamic update query based on provided fields
    const updates: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    if (data.title !== undefined) {
      updates.push(`title = $${paramIndex}`);
      params.push(data.title.trim());
      paramIndex++;
    }

    if (data.description !== undefined) {
      updates.push(`description = $${paramIndex}`);
      params.push(data.description?.trim() || null);
      paramIndex++;
    }

    if (data.completed !== undefined) {
      updates.push(`completed = $${paramIndex}`);
      params.push(data.completed);
      paramIndex++;
    }

    if (data.categoryId !== undefined) {
      updates.push(`category_id = $${paramIndex}`);
      params.push(data.categoryId);
      paramIndex++;
    }

    if (data.dueDate !== undefined) {
      updates.push(`due_date = $${paramIndex}`);
      params.push(data.dueDate || null);
      paramIndex++;
    }

    // If nothing to update, return null
    if (updates.length === 0) {
      return this.findById(id);
    }

    // Add the ID parameter
    params.push(id);

    const query = `
      UPDATE todos
      SET ${updates.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING 
        id,
        title,
        description,
        completed,
        due_date as "dueDate",
        category_id as "categoryId",
        created_at as "createdAt",
        updated_at as "updatedAt"
    `;

    const result = await pool.query<Todo>(query, params);
    return result.rows[0] || null;
  }

  /**
   * Delete a todo.
   */
  async delete(id: string): Promise<boolean> {
    const query = `DELETE FROM todos WHERE id = $1`;
    const result = await pool.query(query, [id]);
    return (result.rowCount ?? 0) > 0;
  }

  /**
   * Count todos by completion status.
   * Useful for statistics.
   */
  async countByStatus(): Promise<{ total: number; active: number; completed: number }> {
    const query = `
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE completed = false) as active,
        COUNT(*) FILTER (WHERE completed = true) as completed
      FROM todos
    `;

    const result = await pool.query<{ total: string; active: string; completed: string }>(query);
    const row = result.rows[0]!;

    return {
      total: parseInt(row.total, 10),
      active: parseInt(row.active, 10),
      completed: parseInt(row.completed, 10),
    };
  }
}

