import request from 'supertest';
import { createApp } from '../../../app';
import { pool } from '../../../config/database';

/**
 * Integration tests for category routes.
 * These test the full request/response cycle.
 * 
 * Note: These would normally run against a test database.
 * For now, we're mocking the database layer.
 */

// Mock the database to avoid needing a real connection in tests
jest.mock('../../../config/database', () => ({
  pool: {
    query: jest.fn(),
    connect: jest.fn(),
    end: jest.fn(),
    on: jest.fn(),
  },
  connectDatabase: jest.fn(),
  disconnectDatabase: jest.fn(),
}));

describe('Category Routes', () => {
  const app = createApp();
  const mockPool = pool as jest.Mocked<typeof pool>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/categories', () => {
    it('should return all categories', async () => {
      const mockCategories = [
        { id: '1', name: 'Work', created_at: new Date(), updated_at: new Date() },
        { id: '2', name: 'Personal', created_at: new Date(), updated_at: new Date() },
      ];

      // @ts-expect-error - Mocking query result
      mockPool.query.mockResolvedValue({ rows: mockCategories });

      const response = await request(app).get('/api/categories');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data).toHaveLength(2);
    });
  });

  describe('POST /api/categories', () => {
    it('should create a new category with valid data', async () => {
      const newCategory = {
        id: '1',
        name: 'Work',
        created_at: new Date(),
        updated_at: new Date(),
      };

      // Mock findByName (returns null - no duplicate)
      // @ts-expect-error - Mocking query result
      mockPool.query.mockResolvedValueOnce({ rows: [] });
      // Mock create
      // @ts-expect-error - Mocking query result
      mockPool.query.mockResolvedValueOnce({ rows: [newCategory] });

      const response = await request(app)
        .post('/api/categories')
        .send({ name: 'Work' });

      expect(response.status).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.data.name).toBe('Work');
    });

    it('should return 400 for invalid data', async () => {
      const response = await request(app)
        .post('/api/categories')
        .send({ name: '' });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
    });

    it('should trim whitespace from category name', async () => {
      const newCategory = {
        id: '1',
        name: 'Work',
        created_at: new Date(),
        updated_at: new Date(),
      };

      // @ts-expect-error - Mocking query result
      mockPool.query.mockResolvedValueOnce({ rows: [] });
      // @ts-expect-error - Mocking query result
      mockPool.query.mockResolvedValueOnce({ rows: [newCategory] });

      const response = await request(app)
        .post('/api/categories')
        .send({ name: '  Work  ' });

      expect(response.status).toBe(201);
      expect(response.body.data.name).toBe('Work');
    });
  });

  describe('PUT /api/categories/:id', () => {
    it('should update a category', async () => {
      const updatedCategory = {
        id: '1',
        name: 'Updated Work',
        created_at: new Date(),
        updated_at: new Date(),
      };

      // Mock findById
      // @ts-expect-error - Mocking query result
      mockPool.query.mockResolvedValueOnce({ rows: [updatedCategory] });
      // Mock findByName (no duplicate)
      // @ts-expect-error - Mocking query result
      mockPool.query.mockResolvedValueOnce({ rows: [] });
      // Mock update
      // @ts-expect-error - Mocking query result
      mockPool.query.mockResolvedValueOnce({ rows: [updatedCategory] });

      const response = await request(app)
        .put('/api/categories/550e8400-e29b-41d4-a716-446655440000')
        .send({ name: 'Updated Work' });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
    });

    it('should return 400 for invalid UUID', async () => {
      const response = await request(app)
        .put('/api/categories/invalid-id')
        .send({ name: 'Updated' });

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/categories/:id', () => {
    it('should delete a category', async () => {
      const category = {
        id: '1',
        name: 'Work',
        created_at: new Date(),
        updated_at: new Date(),
      };

      // Mock findById
      // @ts-expect-error - Mocking query result
      mockPool.query.mockResolvedValueOnce({ rows: [category] });
      // Mock hasAssociatedTodos
      // @ts-expect-error - Mocking query result
      mockPool.query.mockResolvedValueOnce({ rows: [{ has_todos: false }] });
      // Mock delete
      // @ts-expect-error - Mocking query result
      mockPool.query.mockResolvedValueOnce({ rowCount: 1 });

      const response = await request(app).delete(
        '/api/categories/550e8400-e29b-41d4-a716-446655440000'
      );

      expect(response.status).toBe(204);
    });
  });
});

