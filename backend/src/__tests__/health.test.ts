import request from 'supertest';
import { createApp } from '../app';

/**
 * Health endpoint tests.
 * These are simple but important - they verify the server can start
 * and respond to requests.
 */
describe('Health Check', () => {
  const app = createApp();

  it('should return 200 OK with status', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('uptime');
  });

  it('should return uptime as a number', async () => {
    const response = await request(app).get('/health');

    expect(typeof response.body.uptime).toBe('number');
    expect(response.body.uptime).toBeGreaterThanOrEqual(0);
  });
});

/**
 * 404 handler tests.
 * Make sure we return proper error responses for undefined routes.
 */
describe('404 Handler', () => {
  const app = createApp();

  it('should return 404 for undefined GET routes', async () => {
    const response = await request(app).get('/api/nonexistent');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('status', 'error');
    expect(response.body.message).toContain('Cannot GET');
  });

  it('should return 404 for undefined POST routes', async () => {
    const response = await request(app).post('/api/nonexistent');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('status', 'error');
    expect(response.body.message).toContain('Cannot POST');
  });
});

