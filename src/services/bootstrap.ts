import express, { type NextFunction, type Request, type Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { errorHandler, NotFoundError } from '#errors/index';
import controllers from '#controllers/v1/index';
import { consola } from 'consola';
import startJobs from '#jobs/index';
import cors from 'cors';
import discord from '#apis/discord/index';
import { BOOTSTRAP_MESSAGE } from '#utils/constants';

dotenv.config();
dotenv.config({ path: '.env.local', override: true });
/**
 * This Class is responsible for the init and run of the server.
 * @class HttpService
 */
class BootstrapExpress {
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
    this.use404ErrorHandler();
    this.app.use(errorHandler);
  }

  useDefaultMiddlewares(): void {
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  async start(port: number = 3300, settings: object = {}): Promise<void> {
    consola.box(BOOTSTRAP_MESSAGE);
    const user = await discord.users.fetch(process.env.DISCORD_ADMIN_USER_ID as string);
    this.useDefaultMiddlewares();
    this.useApi();
    this.setSettings(settings);
    void startJobs();
    this.app.listen(port, async () => {
      await user.send('Server is running... 🚀');
      consola.success(`Server is running on port ${port}`);
    });
  }
}

export default new BootstrapExpress();
