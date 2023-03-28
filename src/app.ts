import config from "./config";
import { HttpService } from "./services";
import settings from "./utils/settings";

/**
 * This file is responsible for the init of the backend.
 * @class HttpService - Application bootstrap file
 * @method start - Starts the server
 */
HttpService.start(config.port!, settings);
