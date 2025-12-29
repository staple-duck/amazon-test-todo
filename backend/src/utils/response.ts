import { Response } from 'express';

/**
 * Standardized success response helper.
 * Keeps our API responses consistent across all endpoints.
 */
export const sendSuccess = <T>(
  res: Response,
  data: T,
  statusCode = 200
): void => {
  res.status(statusCode).json({
    status: 'success',
    data,
  });
};

/**
 * Helper for created resources (201 status).
 * Use this when creating new todos, categories, etc.
 */
export const sendCreated = <T>(res: Response, data: T): void => {
  sendSuccess(res, data, 201);
};

/**
 * Helper for successful deletion (204 status).
 * 204 means "success, but no content to return"
 */
export const sendNoContent = (res: Response): void => {
  res.status(204).send();
};

