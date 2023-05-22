import { type NextFunction, type Request, type Response } from 'express';
import { ObjectId } from 'mongodb';
import { BadRequestError, UnauthorizedError } from '@/errors';
import UserService from '@/controllers/v1/users/service';

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
export const requiredId: any = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id || req.body.id;
  if (!id || !ObjectId.isValid(id)) {
    next(new BadRequestError('Invalid id')); return;
  }
  next();
};
