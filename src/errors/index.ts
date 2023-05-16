import { type ErrorRequestHandler, type NextFunction, type Request, type Response } from 'express';
import { UserFacingError } from './base';
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
  if (err instanceof UserFacingError) {
    return res.status(400).json({
      state: 'error',
      message: err.message ?? 'Something went wrong.',
    }); // Bad request
  } else {
    res.status(500).json({
      state: 'error',
      message: 'Something went wrong.',
    });
  }
  next();
};
