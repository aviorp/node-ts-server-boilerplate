import express, { type RequestHandler, type Request, type Response, type NextFunction, type Router, type IRouterMatcher } from 'express';
import { BadRequestError } from '@/errors';
import logger from './logger';

type CrudRouter = {
  createCrud: (service: any) => void
} & Router;

export const createCrudRouter: any = (router, service: any) => {
  router.get('/', async (req: Request, res: Response) => {
    const data = await service.getAll(req);
    res.json({ state: 'success', data });
  });
  router.get('/:id', async (req: Request, res: Response) => {
    const data = await service.getById(req);
    if (!data) {
      res.json({ state: 'success', message: 'Item Not Found.', data: null });
    }
    res.json({ state: 'success', data });
  });
  router.post('/', async (req: Request, res: Response) => {
    await service.create(req);
    res.json({ state: 'success', message: 'Item Created Successfully.' });
  });
  router.post('/bulk', async (req: Request, res: Response) => {
    await service.createBulk(req);
    res.json({ state: 'success', message: 'Items Created Successfully.' });
  });
  router.put('/:id', async (req: Request, res: Response) => {
    await service.update(req);
    res.json({ state: 'success', message: 'Item Updated Successfully.' });
  });
  router.delete('/:id', async (req: Request, res: Response) => {
    await service.delete(req);
    res.json({ state: 'success', message: 'Item Deleted Successfully.' });
  });
  return router;
};

const wrapper = (handler: any): RequestHandler => {
  return (async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (res.headersSent) return;
      await handler(req, res, next);
    } catch (error: any) {
      logger.error(error);
      next(new BadRequestError(error.message as string));
    }
  }) as unknown as RequestHandler;
};

// eslint-disable-next-line
export const createRouter = () => {
  const expressRouter = express.Router() as CrudRouter;

  const GET = expressRouter.get;
  const POST = expressRouter.post;
  const PUT = expressRouter.put;
  const DELETE = expressRouter.delete;

  // @ts-expect-error
  expressRouter.get = (...args: IRouterMatcher<Router, 'get'>) => {
    const [path, ...rest] = args;
    const handler = rest.pop();
    // @ts-expect-error
    GET.call(expressRouter, path, ...rest, wrapper(handler));
  };
  // @ts-expect-error
  expressRouter.post = (...args: IRouterMatcher<Router, 'post'>) => {
    const [path, ...rest] = args;
    const handler = rest.pop();

    // @ts-expect-error
    POST.call(expressRouter, path, ...rest, wrapper(handler));
  };
  // @ts-expect-error
  expressRouter.put = (...args: IRouterMatcher<Router, 'put'>) => {
    const [path, ...rest] = args;
    const handler = rest.pop();
    // @ts-expect-error
    PUT.call(expressRouter, path, ...rest, wrapper(handler));
  };
  // @ts-expect-error
  expressRouter.delete = (...args: IRouterMatcher<Router, 'delete'>) => {
    const [path, ...rest] = args;
    const handler = rest.pop();
    // @ts-expect-error
    DELETE.call(expressRouter, path, ...rest, wrapper(handler));
  };

  expressRouter.createCrud = (service: any) => {
    createCrudRouter(expressRouter, service);
  };
  return expressRouter;
};
