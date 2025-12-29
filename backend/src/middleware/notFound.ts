import { Request, Response } from 'express';

/**
 * 404 handler for undefined routes.
 * Place this AFTER all your route definitions.
 * If we get here, it means no route matched the request.
 */
export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    status: 'error',
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
};

