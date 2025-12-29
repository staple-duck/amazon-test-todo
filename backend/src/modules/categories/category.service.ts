import { CategoryRepository } from './category.repository';
import { Category, CreateCategoryDto, UpdateCategoryDto } from './category.types';
import { AppError } from '../../middleware/errorHandler';

/**
 * Business logic layer for categories.
 * This is where we put validation rules, business constraints, etc.
 */
export class CategoryService {
  private repository: CategoryRepository;

  constructor() {
    this.repository = new CategoryRepository();
  }

  /**
   * Get all categories.
   * Just pass through to the repository - no business logic needed here.
   */
  async getAllCategories(): Promise<Category[]> {
    return this.repository.findAll();
  }

  /**
   * Get a category by ID.
   * Throws 404 if not found - caller doesn't need to check for null.
   */
  async getCategoryById(id: string): Promise<Category> {
    const category = await this.repository.findById(id);

    if (!category) {
      throw new AppError(404, 'Category not found');
    }

    return category;
  }

  /**
   * Create a new category.
   * Checks for duplicate names before creating.
   */
  async createCategory(data: CreateCategoryDto): Promise<Category> {
    // Check if a category with this name already exists
    const existing = await this.repository.findByName(data.name);

    if (existing) {
      throw new AppError(409, 'A category with this name already exists');
    }

    return this.repository.create(data);
  }

  /**
   * Update an existing category.
   * Checks for duplicates and makes sure the category exists.
   */
  async updateCategory(id: string, data: UpdateCategoryDto): Promise<Category> {
    // Make sure the category exists first
    await this.getCategoryById(id);

    // Check if another category already has this name
    const existing = await this.repository.findByName(data.name);

    if (existing && existing.id !== id) {
      throw new AppError(409, 'A category with this name already exists');
    }

    const updated = await this.repository.update(id, data);

    // This shouldn't happen since we checked above, but just in case
    if (!updated) {
      throw new AppError(404, 'Category not found');
    }

    return updated;
  }

  /**
   * Delete a category.
   * Prevents deletion if the category has associated todos.
   */
  async deleteCategory(id: string): Promise<void> {
    // Make sure the category exists
    await this.getCategoryById(id);

    // Don't allow deleting categories that are in use
    const hasTodos = await this.repository.hasAssociatedTodos(id);

    if (hasTodos) {
      throw new AppError(
        400,
        'Cannot delete category that has associated todos. Please reassign or delete the todos first.'
      );
    }

    await this.repository.delete(id);
  }
}

