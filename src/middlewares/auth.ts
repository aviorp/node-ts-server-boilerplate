import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { ForbiddenError, NotFoundError, UnauthorizedError } from "../errors";

/**
 * This Class is responsible for the authentication of the user.
 * @class Auth Middleware Class for the authentication of the user.
 */
class Auth {
  verifyUser(req: Request, res: Response, next: NextFunction) {
    const token = req.header("authorization");
    if (!token) {
      return next(new UnauthorizedError("Token not found"));
    }
    jwt.verify(token, config.jwtSecret, (err, auth) => {
      if (err) {
        return next(new UnauthorizedError("Invalid token"));
      }
      if (!auth) {
        return next(new UnauthorizedError("User not authorized"));
      }
      next();
    });
  }
  /**
   * This function check if user can continue to protected routes (Administrators).
   */
  verifyAdmin(req, res, next) {
    const token = req.header("authorization");
    if (!token) {
      return next(new NotFoundError("Token not found"));
    }
    jwt.verify(token, config.jwtSecret, (err, auth) => {
      if (err) {
        return next(new UnauthorizedError("Invalid token"));
      } else {
        if (!auth?.isAdmin) {
          return next(new ForbiddenError("User not authorized"));
        }
        next();
      }
    });
  }
}

export default new Auth();
