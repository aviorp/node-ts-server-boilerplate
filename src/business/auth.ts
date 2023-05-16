import { genSaltSync, hashSync } from 'bcryptjs';
import { type UserI } from '../interfaces';
import { AuthService, UserService } from '../services';

/**
 *  This Class is responsible for the business logic of the authentication.
 * @class Auth Business Logic Class for the authentication.
 */
class AuthBL {
  async register(user: UserI): Promise<UserI> {
    const salt = await genSaltSync(10);
    const hashedPassword = await hashSync(user.password, salt);
    const newUser = { ...user, password: hashedPassword };
    return UserService.create(newUser);
  }

  async login(username: string, passwordToCompare: string): Promise<string> {
    const user = (await UserService.getByUsername(username)) as UserI;
    return AuthService.login(user, passwordToCompare);
  }
}

export default new AuthBL();
