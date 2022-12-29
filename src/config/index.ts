import "dotenv/config";

/**
 * exporting the config object to be used in the application.
 * @exports config
 * @type {Object}
 * @property {string} jwtSecret - The secret key for the jwt.
 * @property {string} DB_URI - The URI for MongoDB database.
 * @property {string} port - The port for the server.
 * @property {string} env - The environment for the server.
 */

export default {
  env: process.env.NODE_ENV,
  port: +process.env.PORT! as number,
  DB_URI: process.env.DB_URI as string,
  jwtSecret: process.env.JWT_SECRET as string,
  awsBucketName: process.env.AWS_BUCKET_NAME || "bucketName",
  awsBucketRegion: process.env.AWS_BUCKET_REGION || "eu-central-1",
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID || "accessKeyId",
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "secretAccessKey"
};
