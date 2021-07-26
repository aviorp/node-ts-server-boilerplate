import { NextFunction } from "connect";
import express from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import { Server } from "socket.io";
import { errorHandler, NotFoundError } from "../errorHandlers";
import swaggerDocument from "../swaggerConfig";
import routesModules from "../routes";
import db from "../db";

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
    this.app.all("*", (req: Request, res: Response, next: NextFunction) => {
      next(new NotFoundError(`Can't find ${req!.url}`));
    });
    return this;
  }
  useRoutes() {
    this.app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    routesModules.forEach(({ path, module }) => {
      this.app.use(path, module);
    });
  }
  initApp(port) {
    this.useDefaultMiddlewares();
    const server = this.app.listen(port, () =>
      console.log(`listening on port ${port}...`)
    );
    new Server(server);
  }

  useApi() {
    this.useRoutes();
    this.use404ErrorHandler();
    this.app.use(errorHandler);
    db();
  }

  useDefaultMiddlewares() {
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(
      bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
      })
    );
    this.app.use(morgan("tiny"));
  }
}

export default new HttpService();