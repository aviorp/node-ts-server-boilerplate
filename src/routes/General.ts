import express, { NextFunction, Request, Response } from "express";
import {
  deleteFileFromS3Bucket,
  downloadFileFromS3Bucket,
  uploadFileToS3Bucket
} from "../apis/s3";
import { upload } from "../utils/multer";
const router = express.Router();

/**
 * the Api will send message to redirect to Swagger UI page.
 * @returns The message.
 */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      state: "success",
      message: "Welcome to the API. Please visit /api-docs for documentation."
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Uploading a file to the server.
 * @returns The message.
 * @param file The file to upload.
 * @param req The request.
 */
router.post(
  "/upload",
  upload.single("file"),
  async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file;
    try {
      await uploadFileToS3Bucket(file);
      res.status(201).json({
        state: "success",
        message: "File Uploaded",
        fileName: req.file?.filename
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Downloading a file from the server.
 * @returns The file (streamed).
 * @param {string} fileKey The key of the file to download.
 *
 */
router.get(
  "/downloads/:fileKey",
  async (req: Request, res: Response, next: NextFunction) => {
    const fileKey = req.params.fileKey;
    try {
      if (!fileKey) {
        throw new Error("File key not provided");
      }
      const fileStream = await downloadFileFromS3Bucket(fileKey);
      fileStream.pipe(res);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Deleting a file from the server.
 * @returns The message.
 * @param {string} fileKey The key of the file to delete.
 */
router.delete(
  "/delete/:fileKey",
  async (req: Request, res: Response, next: NextFunction) => {
    const fileKey = req.params.fileKey;
    try {
      if (!fileKey) {
        throw new Error("File key not provided");
      }
      await deleteFileFromS3Bucket(fileKey);
      res.status(200).send({
        state: "success",
        message: "File Deleted"
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * health check endpoint
 * @returns The message.
 */
router.get(
  "/health",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res
        .status(200)
        .json({ state: "OK", message: "Server is up and running" });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
