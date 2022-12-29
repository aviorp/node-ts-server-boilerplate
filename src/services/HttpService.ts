import { json, urlencoded } from "body-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { Server } from "socket.io";
import swaggerUi from "swagger-ui-express";
import { errorHandler, NotFoundError } from "../errors";
import routes from "../routes";
import swaggerDocument from "../swaggerConfig";
import { initDatabase } from "./../db/index";

/**
 * This Class is responsible for the init and run of the server.
 * @class HttpService
 */
class HttpService {
  app;
  constructor() {
    this.app = express();
  }

  setSettings(settings: object) {
    Object.entries(settings).forEach((key, value) => {
      this.app.set(key, value);
    });
  }

  use404ErrorHandler() {
    this.app.get("*", (req: Request, res: Response, next: NextFunction) => {
      next(new NotFoundError(`${req.originalUrl!} not found`));
    });
  }

  async useRoutes() {
    routes.forEach(({ path, module }) => {
      this.app.use(path, module);
    });
  }

  initApp(port) {
    this.useDefaultMiddlewares();
    const server = this.app.listen(port, () =>
      console.log(`Server is running on port ${port}`)
    );
    new Server(server);
  }

  useApi() {
    this.useSwagger();
    this.useRoutes();
    this.use404ErrorHandler();
    this.app.use(errorHandler);
    initDatabase();
  }

  useDefaultMiddlewares() {
    this.app.use(morgan("tiny"));
    this.app.use(json({ limit: "50mb" }));
    this.app.use(cors());
    this.app.use(
      urlencoded({
        limit: "50mb",
        extended: true
      })
    );
  }
  useSwagger() {
    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }
  start(port: number = 3300, settings: object = {}) {
    this.setSettings(settings);
    this.initApp(port);
    this.useApi();
  }
}

export default new HttpService();
