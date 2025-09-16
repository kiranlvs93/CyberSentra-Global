export class AppError extends Error {
  public readonly statusCode: number;
  public readonly details?: unknown;

  constructor(message: string, statusCode = 500, details?: unknown) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

export const createNotFoundError = (message: string): AppError =>
  new AppError(message, 404);

export const createBadRequestError = (message: string, details?: unknown): AppError =>
  new AppError(message, 400, details);

export const createUnauthorizedError = (message: string): AppError =>
  new AppError(message, 401);

export const createForbiddenError = (message: string): AppError =>
  new AppError(message, 403);
