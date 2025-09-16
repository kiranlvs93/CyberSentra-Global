import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

import { AppError } from '../utils/errors';

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Invalid request payload',
      errors: err.flatten(),
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      details: err.details,
    });
  }

  console.error(err);
  return res.status(500).json({ message: 'Internal server error' });
};
