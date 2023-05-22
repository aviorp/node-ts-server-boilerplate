import S3 from 'aws-sdk/clients/s3';
import fs from 'fs';
import config from '@/config';

const bucketName = config.AWS_BUCKET_NAME;
const region = config.AWS_BUCKET_REGION;
const accessKeyId = config.AWS_ACCESS_KEY_ID;
const secretAccessKey = config.AWS_SECRET_ACCESS_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

/**
 * Uploads a file to s3
 * @param {Blob} file - The file to upload.
 * @returns {Promise} - Promise object represents the data of the file.
 *
 */
export const uploadFileToS3Bucket: any = async (file) => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };
  return s3.upload(uploadParams).promise();
};

/**
 * Downloads a file from s3
 * @param {string} fileKey - The name of the file to download.
 * @returns {Promise} - Promise object represents the data of the file.
 */
export const downloadFileFromS3Bucket: any = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };
  return s3.getObject(downloadParams).createReadStream();
};

/**
 * Delete a file from s3
 * @param {string} fileKey - The name of the file to download.
 */

export const deleteFileFromS3Bucket: any = async (fileKey: string) => {
  const deleteParams = {
    Key: fileKey,
    Bucket: bucketName,
  };
  return s3.deleteObject(deleteParams).promise();
};
