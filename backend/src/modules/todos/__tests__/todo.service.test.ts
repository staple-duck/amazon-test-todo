import { TodoService } from '../todo.service';
import { TodoRepository } from '../todo.repository';
import { CategoryRepository } from '../../categories/category.repository';
import { AppError } from '../../../middleware/errorHandler';

// Mock the repositories
jest.mock('../todo.repository');
jest.mock('../../categories/category.repository');

describe('TodoService', () => {
  let service: TodoService;
  let mockTodoRepository: jest.Mocked<TodoRepository>;
  let mockCategoryRepository: jest.Mocked<CategoryRepository>;

  beforeEach(() => {
    service = new TodoService();
    mockTodoRepository = (service as any).todoRepository;
    mockCategoryRepository = (service as any).categoryRepository;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllTodos', () => {
    it('should get all todos when status is "all"', async () => {
      const mockTodos = [
        { id: '1', title: 'Test Todo', completed: false },
        { id: '2', title: 'Done Todo', completed: true },
      ];

      mockTodoRepository.findAll.mockResolvedValue(mockTodos as any);

      const result = await service.getAllTodos({ status: 'all' });

      expect(result).toEqual(mockTodos);
      expect(mockTodoRepository.findAll).toHaveBeenCalledWith({}, 'createdAt', 'desc');
    });

    it('should filter active todos when status is "active"', async () => {
      mockTodoRepository.findAll.mockResolvedValue([]);

      await service.getAllTodos({ status: 'active' });

      expect(mockTodoRepository.findAll).toHaveBeenCalledWith(
        { completed: false },
        'createdAt',
        'desc'
      );
    });

    it('should filter completed todos when status is "completed"', async () => {
      mockTodoRepository.findAll.mockResolvedValue([]);

      await service.getAllTodos({ status: 'completed' });

      expect(mockTodoRepository.findAll).toHaveBeenCalledWith(
        { completed: true },
        'createdAt',
        'desc'
      );
    });

    it('should filter by category when categoryId is provided', async () => {
      const categoryId = '550e8400-e29b-41d4-a716-446655440000';
      mockCategoryRepository.findById.mockResolvedValue({ id: categoryId } as any);
      mockTodoRepository.findAll.mockResolvedValue([]);

      await service.getAllTodos({ categoryId });

      expect(mockCategoryRepository.findById).toHaveBeenCalledWith(categoryId);
      expect(mockTodoRepository.findAll).toHaveBeenCalledWith(
        { categoryId },
        'createdAt',
        'desc'
      );
    });

    it('should throw 404 when category does not exist', async () => {
      mockCategoryRepository.findById.mockResolvedValue(null);

      await expect(
        service.getAllTodos({ categoryId: '550e8400-e29b-41d4-a716-446655440000' })
      ).rejects.toThrow(AppError);
    });
  });

  describe('createTodo', () => {
    const validCategory = { id: '1', name: 'Work' };
    const createData = {
      title: 'New Todo',
      categoryId: '1',
    };

    it('should create a todo with valid data', async () => {
      const mockTodo = { id: '1', ...createData, completed: false };

      mockCategoryRepository.findById.mockResolvedValue(validCategory as any);
      mockTodoRepository.create.mockResolvedValue(mockTodo as any);

      const result = await service.createTodo(createData);

      expect(result).toEqual(mockTodo);
      expect(mockCategoryRepository.findById).toHaveBeenCalledWith('1');
      expect(mockTodoRepository.create).toHaveBeenCalledWith(createData);
    });

    it('should throw 404 when category does not exist', async () => {
      mockCategoryRepository.findById.mockResolvedValue(null);

      await expect(service.createTodo(createData)).rejects.toThrow(
        new AppError(404, 'Category with ID 1 not found')
      );
    });

    it('should throw 400 when due date and time is in the past', async () => {
      const yesterday = new Date();
      yesterday.setTime(yesterday.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago

      mockCategoryRepository.findById.mockResolvedValue(validCategory as any);

      await expect(
        service.createTodo({
          ...createData,
          dueDate: yesterday,
        })
      ).rejects.toThrow(new AppError(400, 'Due date and time cannot be in the past'));
    });

    it('should allow due date and time to be in the future', async () => {
      const future = new Date();
      future.setTime(future.getTime() + 60 * 60 * 1000); // 1 hour from now
      const mockTodo = { id: '1', ...createData, dueDate: future };

      mockCategoryRepository.findById.mockResolvedValue(validCategory as any);
      mockTodoRepository.create.mockResolvedValue(mockTodo as any);

      await expect(
        service.createTodo({
          ...createData,
          dueDate: future,
        })
      ).resolves.toBeDefined();
    });

    it('should reject due date and time if it is in the past (even today)', async () => {
      const pastTime = new Date();
      pastTime.setHours(pastTime.getHours() - 1); // 1 hour ago

      mockCategoryRepository.findById.mockResolvedValue(validCategory as any);

      await expect(
        service.createTodo({
          ...createData,
          dueDate: pastTime,
        })
      ).rejects.toThrow(new AppError(400, 'Due date and time cannot be in the past'));
    });
  });

  describe('updateTodo', () => {
    it('should update a todo', async () => {
      const existingTodo = { id: '1', title: 'Old', categoryId: '1' };
      const updateData = { title: 'Updated' };
      const updatedTodo = { ...existingTodo, ...updateData };

      mockTodoRepository.findById.mockResolvedValue(existingTodo as any);
      mockTodoRepository.update.mockResolvedValue(updatedTodo as any);

      const result = await service.updateTodo('1', updateData);

      expect(result).toEqual(updatedTodo);
    });

    it('should throw 404 when todo does not exist', async () => {
      mockTodoRepository.findById.mockResolvedValue(null);

      await expect(service.updateTodo('999', { title: 'Updated' })).rejects.toThrow(
        new AppError(404, 'Todo not found')
      );
    });

    it('should verify category exists when changing category', async () => {
      const existingTodo = { id: '1', categoryId: '1' };
      const newCategory = { id: '2', name: 'Personal' };

      mockTodoRepository.findById.mockResolvedValue(existingTodo as any);
      mockCategoryRepository.findById.mockResolvedValue(newCategory as any);
      mockTodoRepository.update.mockResolvedValue({ ...existingTodo, categoryId: '2' } as any);

      await service.updateTodo('1', { categoryId: '2' });

      expect(mockCategoryRepository.findById).toHaveBeenCalledWith('2');
    });
  });

  describe('deleteTodo', () => {
    it('should delete a todo', async () => {
      const mockTodo = { id: '1', title: 'Test' };

      mockTodoRepository.findById.mockResolvedValue(mockTodo as any);
      mockTodoRepository.delete.mockResolvedValue(true);

      await service.deleteTodo('1');

      expect(mockTodoRepository.delete).toHaveBeenCalledWith('1');
    });

    it('should throw 404 when todo does not exist', async () => {
      mockTodoRepository.findById.mockResolvedValue(null);

      await expect(service.deleteTodo('999')).rejects.toThrow(
        new AppError(404, 'Todo not found')
      );
    });
  });

  describe('getStatistics', () => {
    it('should return todo statistics', async () => {
      const mockStats = { total: 10, active: 6, completed: 4 };

      mockTodoRepository.countByStatus.mockResolvedValue(mockStats);

      const result = await service.getStatistics();

      expect(result).toEqual(mockStats);
    });
  });
});

