import { type NextFunction, type Request, type Response } from 'express';
import { type User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import config from '@/config';
import { ForbiddenError, UnauthorizedError } from '@/errors';

export const verifyToken: any = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.app.get('token');
  if (!(token)) {
    next(new UnauthorizedError('Token not found')); return;
  }
  try {
    await jwt.verify(token, config.JWT_SECRET);
    next();
  } catch (error) {
    next(new UnauthorizedError('Invalid token'));
  }
};

export const verifyAdmin: any = (req, res, next) => {
  const { is_admin } = req.app.get('user') as User;
  return is_admin ? next() : next(new ForbiddenError('User Forbidden'));
};
