import config from "./config";
import HttpService from "./services/HttpService";

const settings = {
  // socketio: io,
  "trust proxy": true,
};

HttpService.setSettings(settings);
HttpService.initApp(config.port);
HttpService.useApi();
