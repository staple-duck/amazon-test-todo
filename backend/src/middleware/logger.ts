import { Request, Response, NextFunction } from 'express';

/**
 * Simple request logging middleware.
 * Logs every incoming request with method, URL, and response time.
 * Helps with debugging and monitoring.
 */
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const start = Date.now();

  // Listen for when the response finishes
  res.on('finish', () => {
    const duration = Date.now() - start;
    const { method, originalUrl } = req;
    const { statusCode } = res;

    // Color code status for better visibility in terminal
    const statusColor = statusCode >= 500 ? '🔴' : statusCode >= 400 ? '🟡' : '🟢';

    console.log(
      `${statusColor} ${method} ${originalUrl} - ${statusCode} (${duration}ms)`
    );
  });

  next();
};

