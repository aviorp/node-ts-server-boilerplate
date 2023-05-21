import express, { type RequestHandler, type Request, type Response, type NextFunction, type Router, type IRouterMatcher } from 'express';
import { BadRequestError } from '@/errors';

interface Filters {
  search?: string
  skip?: string | number
  take?: string | number
  searchFields?: string[]
}
type CrudRouter = {
  createCrud: (service: any, searchParams: string[]) => void
} & Router;

export const createCrudRouter: any = (router, service: any, searchFields: string[] = []) => {
  router.get('/', async (req: Request, res: Response) => {
    const { search, skip, take } = req.query;
    let filters: Filters | object = {
      searchFields,
      search,
      skip,
      take,
    };
    if (searchFields.length <= 0) {
      filters = {};
    }
    const data = await service.getAll(filters);
    res.json({ state: 'success', data });
  });
  router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await service.getById(id);
    if (!data) {
      res.json({ state: 'success', message: 'Item Not Found.', data: null });
    }
    res.json({ state: 'success', data });
  });
  router.post('/', async (req: Request, res: Response) => {
    await service.create(req.body);
    res.json({ state: 'success', message: 'Item Created Successfully.' });
  });
  router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    await service.update(id, req.body);
    res.json({ state: 'success', message: 'Item Updated Successfully.' });
  });
  router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    await service.delete(id);
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

  expressRouter.createCrud = (service: any, searchFields: string[] = []) => {
    createCrudRouter(expressRouter, service, searchFields);
  };
  return expressRouter;
};
