import { type NextFunction, type Request, type Response } from 'express';
import './prisma';
const wrap = (fn) => async (req: Request, res: Response, next: NextFunction) => fn(req, res, next);

export const useMiddleware: any = (middlewares: any[]) => {
  if (!Array.isArray(middlewares)) middlewares = [middlewares];
  return middlewares.map((middleware) => wrap(middleware));
};
