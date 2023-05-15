import express, { NextFunction, Request, Response } from "express";
import { AuthBL } from "../business";
import { BadRequestError } from "../errors";
import { userIsNull } from "../middlewares/requirements";
import { decodeToken } from "../utils";
import { useMiddleware } from "../middlewares";

const router = express.Router();

/**
 * Register a new user.
 * @param username The username of the user.
 * @param password The password of the user.
 * @returns The user with the given username.
 * @returns The message.
 */
router.post("/register", useMiddleware(userIsNull), async (req: Request, res: Response, next: NextFunction) => {
  try {
    await AuthBL.register(req.body);
    return res.status(201).json({
      state: "success",
      message: "User Created.",
    });
  } catch (error: any) {
    next(new BadRequestError("Failed to create user."));
  }
});

/**
 * Login a user.
 * @param username The username of the user.
 * @param password The password of the user.
 * @returns The user with the given username.
 * @returns The message.
 * @returns The token.
 */
router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new Error("Missing username or password.");
  }
  try {
    const token = await AuthBL.login(username, password);
    const user = decodeToken(token);
    res.app.set("token", token);
    res.app.set("user", user);
    return res.status(201).json({
      state: "success",
      message: "User Logged In.",
      token,
    });
  } catch (error: any) {
    next(new BadRequestError("Username or Password Are Invalid."));
  }
});

export default router;
