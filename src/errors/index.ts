import { type ErrorRequestHandler, type NextFunction, type Request, type Response } from 'express';
import { UserFacingError } from './base';
import logger from '@/utils/logger';
export class BadRequestError extends UserFacingError {
  readonly statusCode = 400;
}

export class NotFoundError extends UserFacingError {
  readonly statusCode = 404;
}
export class UnauthorizedError extends UserFacingError {
  readonly statusCode = 401;
}
export class ForbiddenError extends UserFacingError {
  readonly statusCode = 403;
}

export const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err);
  if (err instanceof UserFacingError) {
    return res.status(400).json({
      state: 'error',
      message: err.message ?? 'Unable to process your request. (400)',
    });
  } else {
    res.status(500).json({
      state: 'error',
      message: 'Something went wrong... Please try again later. (500)',
    });
  }
  next();
};
