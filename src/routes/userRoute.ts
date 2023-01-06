import express, { NextFunction, Request, Response } from "express";
import { UserBL } from "../business";
import { BadRequestError } from "../errors";
import { useMiddleware } from "../middlewares";
import { requiredId, userExist, userIsNull } from "../middlewares/requirements";

const router = express.Router();

/**
 * Gets all the users in the api.
 * @returns All The users in the api.
 */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserBL.getAll();
    res.status(200).json({
      state: "success",
      data: users
    });
  } catch (error: any) {
    next(new BadRequestError(error));
  }
});

/**
 * Creates a new user.
 * @interface UserI,
 */
router.post(
  "/",
  useMiddleware(userIsNull),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await UserBL.create(req.body);
      return res.status(201).json({
        state: "success",
        message: "User Created."
      });
    } catch (error: any) {
      next(new BadRequestError(error));
    }
  }
);

/**
 * Gets a user by id.
 * @param id The id of the user.
 * @returns The user with the given id.
 */
router.get(
  "/:id",
  useMiddleware(requiredId),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserBL.getById(req.params.id);
      res.status(200).json({
        state: "success",
        data: user
      });
    } catch (error: any) {
      next(new BadRequestError(error));
    }
  }
);

/**
 * Updates a user by id.
 * @param id The id of the user.
 * @returns The updated user.
 */
router.put(
  "/:id",
  useMiddleware([requiredId, userExist]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await UserBL.update(req.params.id, req.body);
      return res.status(201).json({
        state: "success",
        message: "User Updated"
      });
    } catch (error: any) {
      next(new BadRequestError(error));
    }
  }
);

/**
 * Deletes a user by id.
 * @param id The id of the user.
 * @returns The deleted user.
 */
router.delete(
  "/:id",
  useMiddleware(requiredId),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await UserBL.delete(req.params.id);
      return res.status(200).send({
        state: "success",
        message: "User Deleted"
      });
    } catch (error: any) {
      next(new BadRequestError(error));
    }
  }
);

export default router;
