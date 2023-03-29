import { UserI } from "./../interfaces/index";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { ForbiddenError, NotFoundError, UnauthorizedError } from "../errors";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.app.get("token");
  if (!token) {
    return next(new UnauthorizedError("Token not found"));
  }
  try {
    await jwt.verify(token, config.jwtSecret);
    next();
  } catch (error) {
    return next(new UnauthorizedError("Invalid token"));
  }
};

export const verifyAdmin = (req, res, next) => {
  const { is_admin } = req.app.get("user") as UserI;
  return is_admin ? next() : next(new ForbiddenError("User Forbidden"));
};
