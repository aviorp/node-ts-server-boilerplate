import { type NextFunction, type Request, type Response } from 'express';
import { BadRequestError, UnauthorizedError } from '#errors/index.js';
import UserService from '#controllers/v1/users/service.js';

export const userIsNull: any = async (req: Request, res: Response, next: NextFunction) => {
  const username = req.body.username || req.params.username;
  const user = await UserService.getByUsername(username);
  if (user) { next(new BadRequestError('User is exist.')); return; }
  next();
};
export const isExist: any = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.body.id || req.params.id;
  const user = await UserService.getById(id);
  if (!user) { next(new UnauthorizedError('User is not exist.')); return; }
  next();
};
