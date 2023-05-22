import { type Request, type Response } from 'express';
import AuthBL from './BL';
import { userIsNull } from '@/middlewares/requirements';
import { decodeToken } from '@/utils';
import { useMiddleware } from '@/middlewares';
import { createRouter } from '@/utils/createRouter';

const router = createRouter();

/**
 * Register a new user.
 * @param username The username of the user.
 * @param password The password of the user.
 * @returns The user with the given username.
 * @returns The message.
 */

router.post('/register', useMiddleware(userIsNull), async (req: Request, res: Response) => {
  await AuthBL.register(req.body);
  return res.status(201).json({
    state: 'success',
    message: 'User Created.',
  });
});

/**
 * Login a user.
 * @param username The username of the user.
 * @param password The password of the user.
 * @returns The user with the given username.
 * @returns The message.
 * @returns The token.
 */
router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new Error('Missing username or password.');
  }
  const token = await AuthBL.login(username, password);
  const user = decodeToken(token);
  res.app.set('token', token);
  res.app.set('user', user);
  return res.status(201).json({
    state: 'success',
    message: 'User Logged In.',
    token,
  });
});

export default router;
