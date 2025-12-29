import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { env } from './config/env';
import { requestLogger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFound';

/**
 * Create and configure the Express application.
 * This is separate from server.ts so we can easily test it.
 */
export const createApp = (): Express => {
  const app = express();

  // Security middleware - protects against common web vulnerabilities
  app.use(helmet());

  // CORS - allow our frontend to make requests
  app.use(
    cors({
      origin: env.CORS_ORIGIN,
      credentials: true,
    })
  );

  // Compress responses to reduce bandwidth
  app.use(compression());

  // Parse JSON request bodies
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Log all requests
  app.use(requestLogger);

  // Health check endpoint - useful for Docker health checks and monitoring
  app.get('/health', (_req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  // API routes will be added here in next commits
  // app.use('/api/categories', categoryRoutes);
  // app.use('/api/todos', todoRoutes);

  // 404 handler - must be after all routes
  app.use(notFoundHandler);

  // Global error handler - must be last
  app.use(errorHandler);

  return app;
};

