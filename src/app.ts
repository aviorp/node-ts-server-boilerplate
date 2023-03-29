import config from '#config/index';
import BootstrapExpress from '#services/bootstrap';
import settings from '#utils/settings';
/**
 * This file is responsible for the init of the backend.
 * @class BootstrapExpress - Application bootstrap file
 * @method start - Starts the server
 */

// eslint-disable-next-line
BootstrapExpress.start(+config?.port ?? 3300, settings);
