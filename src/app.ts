import config from '@/config';
import HttpService from '@/services/HttpService';
import settings from '@/utils/settings';

/**
 * This file is responsible for the init of the backend.
 * @class HttpService - Application bootstrap file
 * @method start - Starts the server
 */

// eslint-disable-next-line
 HttpService.start(+config?.port ?? 3300, settings);
