import { CategoryService } from '../category.service';
import { CategoryRepository } from '../category.repository';
import { AppError } from '../../../middleware/errorHandler';

// Mock the repository to avoid hitting the actual database
jest.mock('../category.repository');

describe('CategoryService', () => {
  let service: CategoryService;
  let mockRepository: jest.Mocked<CategoryRepository>;

  beforeEach(() => {
    // Create a fresh service and mock repository for each test
    service = new CategoryService();
    mockRepository = (service as any).repository;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllCategories', () => {
    it('should return all categories', async () => {
      const mockCategories = [
        { id: '1', name: 'Work', createdAt: new Date(), updatedAt: new Date() },
        { id: '2', name: 'Personal', createdAt: new Date(), updatedAt: new Date() },
      ];

      mockRepository.findAll.mockResolvedValue(mockCategories as any);

      const result = await service.getAllCategories();

      expect(result).toEqual(mockCategories);
      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCategoryById', () => {
    it('should return a category when found', async () => {
      const mockCategory = {
        id: '1',
        name: 'Work',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRepository.findById.mockResolvedValue(mockCategory as any);

      const result = await service.getCategoryById('1');

      expect(result).toEqual(mockCategory);
      expect(mockRepository.findById).toHaveBeenCalledWith('1');
    });

    it('should throw 404 when category not found', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.getCategoryById('999')).rejects.toThrow(
        new AppError(404, 'Category not found')
      );
    });
  });

  describe('createCategory', () => {
    it('should create a new category', async () => {
      const createData = { name: 'Work' };
      const mockCategory = {
        id: '1',
        name: 'Work',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRepository.findByName.mockResolvedValue(null);
      mockRepository.create.mockResolvedValue(mockCategory as any);

      const result = await service.createCategory(createData);

      expect(result).toEqual(mockCategory);
      expect(mockRepository.findByName).toHaveBeenCalledWith('Work');
      expect(mockRepository.create).toHaveBeenCalledWith(createData);
    });

    it('should throw 409 when category name already exists', async () => {
      const createData = { name: 'Work' };
      const existingCategory = {
        id: '1',
        name: 'Work',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRepository.findByName.mockResolvedValue(existingCategory as any);

      await expect(service.createCategory(createData)).rejects.toThrow(
        new AppError(409, 'A category with this name already exists')
      );

      expect(mockRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('updateCategory', () => {
    it('should update a category', async () => {
      const updateData = { name: 'Updated Work' };
      const existingCategory = {
        id: '1',
        name: 'Work',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const updatedCategory = { ...existingCategory, name: 'Updated Work' };

      mockRepository.findById.mockResolvedValue(existingCategory as any);
      mockRepository.findByName.mockResolvedValue(null);
      mockRepository.update.mockResolvedValue(updatedCategory as any);

      const result = await service.updateCategory('1', updateData);

      expect(result).toEqual(updatedCategory);
      expect(mockRepository.update).toHaveBeenCalledWith('1', updateData);
    });

    it('should throw 404 when category to update not found', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.updateCategory('999', { name: 'Updated' })).rejects.toThrow(
        new AppError(404, 'Category not found')
      );
    });

    it('should throw 409 when new name conflicts with another category', async () => {
      const existingCategory1 = {
        id: '1',
        name: 'Work',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const existingCategory2 = {
        id: '2',
        name: 'Personal',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRepository.findById.mockResolvedValue(existingCategory1 as any);
      mockRepository.findByName.mockResolvedValue(existingCategory2 as any);

      await expect(service.updateCategory('1', { name: 'Personal' })).rejects.toThrow(
        new AppError(409, 'A category with this name already exists')
      );
    });
  });

  describe('deleteCategory', () => {
    it('should delete a category when it has no todos', async () => {
      const mockCategory = {
        id: '1',
        name: 'Work',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRepository.findById.mockResolvedValue(mockCategory as any);
      mockRepository.hasAssociatedTodos.mockResolvedValue(false);
      mockRepository.delete.mockResolvedValue(true);

      await service.deleteCategory('1');

      expect(mockRepository.delete).toHaveBeenCalledWith('1');
    });

    it('should throw 404 when category to delete not found', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.deleteCategory('999')).rejects.toThrow(
        new AppError(404, 'Category not found')
      );
    });

    it('should throw 400 when category has associated todos', async () => {
      const mockCategory = {
        id: '1',
        name: 'Work',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRepository.findById.mockResolvedValue(mockCategory as any);
      mockRepository.hasAssociatedTodos.mockResolvedValue(true);

      await expect(service.deleteCategory('1')).rejects.toThrow(
        new AppError(
          400,
          'Cannot delete category that has associated todos. Please reassign or delete the todos first.'
        )
      );

      expect(mockRepository.delete).not.toHaveBeenCalled();
    });
  });
});

