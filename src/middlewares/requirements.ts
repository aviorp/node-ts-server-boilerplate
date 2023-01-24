import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { BadRequestError, UnauthorizedError } from "../errors";
import { UserService } from "../services";

export const userIsNull = async (req: Request, res: Response, next: NextFunction) => {
  const username = req.body.username || req.params.username;
  const user = await UserService.getByUsername(username);
  if (user) return next(new BadRequestError("User is exist."));
  next();
};
export const userExist = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.body.id || req.params.id;
  const user = await UserService.getById(id);
  if (!user) return next(new UnauthorizedError("User is not exist."));
  next();
};
export const requiredId = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id || req.body.id;
  if (!id || !ObjectId.isValid(id)) {
    return next(new BadRequestError("Invalid id"));
  }
  next();
};
