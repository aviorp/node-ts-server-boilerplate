import express, { type RequestHandler, type Request, type Response, type NextFunction, type Router, type IRouterMatcher } from 'express';
import { BadRequestError } from '#errors/index';
import { consola } from 'consola';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

type CrudRouter = {
  createCrud: (service: any, isProtectedRoute: boolean) => void
} & Router;

const isProtectedRouteFactory = (isProtectedRoute: boolean) => async (req: Request, res: Response, next: NextFunction) => {
  // if (isProtectedRoute) {
  //   await ClerkExpressRequireAuth()(req, res, next);
  // } else {
  next();
  // }
};

export const createCrudRouter: any = (router, service: any, isProtectedRoute = false) => {
  router.get('/', isProtectedRouteFactory(isProtectedRoute), async (req: Request, res: Response) => {
    const data = await service.getAll(req, req.app.get('user_id')) || [];
    res.json({ state: 'success', data });
  });
  router.get('/:id', isProtectedRouteFactory(isProtectedRoute), async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await service.getById(id, req.app.get('user_id'));
    if (!data) {
      res.json({ state: 'success', message: 'Item Not Found.', data: null });
    }
    res.json({ state: 'success', data });
  });
  router.post('/', isProtectedRouteFactory(isProtectedRoute), async (req: Request, res: Response) => {
    await service.create(req.body, req.app.get('user_id'));
    res.json({ state: 'success', message: 'Item Created Successfully.' });
  });
  router.put('/:id', isProtectedRouteFactory(isProtectedRoute), async (req: Request, res: Response) => {
    const { id } = req.params;
    await service.update(id, req.body, req.app.get('user_id'));
    res.json({ state: 'success', message: 'Item Updated Successfully.' });
  });
  router.delete('/:id', isProtectedRouteFactory(isProtectedRoute), async (req: Request, res: Response) => {
    const { id } = req.params;
    await service.delete(id, req.app.get('user_id'));
    res.json({ state: 'success', message: 'Item Deleted Successfully.' });
  });
  return router;
};

const wrapper = (handler: any): RequestHandler => {
  return (async (req: Request, res: Response, next: NextFunction) => {
    try {
      // @ts-expect-error
      req.app.set('user_id', req?.auth?.userId || 'user_2S7HEeYzNIZ6npxYjJQ1bVG53qf');

      if (res.headersSent) return;
      await handler(req, res, next);
    } catch (error: any) {
      consola.error(error);
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

  expressRouter.createCrud = (service: any, isProtectedRoute = false) => {
    createCrudRouter(expressRouter, service, isProtectedRoute);
  };
  return expressRouter;
};
