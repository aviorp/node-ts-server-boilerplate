import 'dotenv/config';
/**
 * exporting the config object to be used in the application.
 * @exports config
 * @type {Object}
 * @property {string} JWT_SECRET - The secret key for the jwt.
 * @property {string} DB_URI - The URI for MongoDB database.
 * @property {string} port - The port for the server.
 * @property {string} env - The environment for the server.
 */

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT ?? 3300,
  DB_URI: process.env.DB_URI as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME as string,
  AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION as string,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID as string,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY as string,
};
