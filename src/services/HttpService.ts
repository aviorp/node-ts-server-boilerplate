import express, { type NextFunction, type Request, type Response } from 'express';
import { initDatabase } from '@/db';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { errorHandler, NotFoundError } from '@/errors';
import controllers from '@/controllers/v1';
import swaggerConfig from '@/swaggerConfig';
import logger from '@/utils/logger';

/**
 * This Class is responsible for the init and run of the server.
 * @class HttpService
 */
class HttpService {
  app;

  constructor() {
    this.app = express();
  }

  setSettings(settings: object): void {
    Object.entries(settings).forEach((key, value) => {
      this.app.set(key, value);
    });
  }

  use404ErrorHandler(): void {
    this.app.get('*', ({ originalUrl }: Request, res: Response, next: NextFunction) => {
      next(new NotFoundError("This route doesn't exist, please check your URL: " + originalUrl, '404'));
    });
  }

  useControllers(): void {
    controllers.forEach(({ path, module }: any) => {
      this.app.use(path, module);
    });
  }

  useApi(): void {
    this.useControllers();
    this.useSwagger();
    this.use404ErrorHandler();
    this.app.use(errorHandler);
  }

  useDefaultMiddlewares(): void {
    this.app.use(morgan('dev'));
    this.app.use(json({ limit: '50mb' }));
    this.app.use(
      urlencoded({
        limit: '50mb',
        extended: true,
      }),
    );
  }

  useSwagger(): void {
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));
  }

  async start(port: number = 3300, settings: object = {}): Promise<void> {
    this.useDefaultMiddlewares();
    this.useApi();
    this.setSettings(settings);
    await initDatabase();
    this.app.listen(port, () => {
      logger.success(`Server is running on port ${port}`);
    });
  }
}

export default new HttpService();
