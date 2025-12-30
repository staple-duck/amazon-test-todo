import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

/**
 * Custom application error class.
 * Extends Error to include HTTP status codes - makes error handling cleaner.
 */
export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

/**
 * Global error handling middleware.
 * This catches all errors thrown in the app and sends a proper response.
 * No more leaked stack traces or cryptic error messages to the client!
 */
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Handle Zod validation errors - these are super common with user input
  if (err instanceof ZodError) {
    res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: err.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    });
    return;
  }

  // Handle our custom AppError
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
    return;
  }

  // Log unexpected errors - these need investigation!
  console.error('💥 Unexpected error:', err);

  // Never expose internal error details in production
  const message =
    process.env.NODE_ENV === 'development'
      ? err.message
      : 'Something went wrong on our end. Please try again.';

  res.status(500).json({
    status: 'error',
    message,
  });
};

/**
 * Async error wrapper - no more try/catch in every route!
 * Wrap async route handlers with this to automatically catch errors.
 * 
 * Example:
 *   router.get('/todos', asyncHandler(async (req, res) => {
 *     const todos = await getTodos(); // If this throws, errorHandler catches it
 *     res.json(todos);
 *   }));
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

