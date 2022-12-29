import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { UserFacingError } from "./base";
export class BadRequestError extends UserFacingError {
  get statusCode() {
    return 400;
  }
}

export class NotFoundError extends UserFacingError {
  get statusCode() {
    return 404;
  }
}
export class UnauthorizedError extends UserFacingError {
  get statusCode() {
    return 401;
  }
}
export class ForbiddenError extends UserFacingError {
  get statusCode() {
    return 403;
  }
}

export const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    return res.status(400).json({
      state: "error",
      message: err.message || "Something went wrong."
    }); // Bad request
  } else {
    res.status(500).json({
      state: "error",
      message: "Something went wrong."
    });
  }
  next();
};
