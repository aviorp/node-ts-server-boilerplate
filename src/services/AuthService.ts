import { compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/index";
import { UserI } from "../interfaces";
import UserService from "./UserService";

/**
 * This Class is responsible for the service layer of the authentication.
 * @class AuthService Service Class for the authentication.
 */
class AuthService {
  comparePasswords(userPassword: string, hashedPassword: string) {
    return compareSync(userPassword, hashedPassword);
  }
  generateToken(user: UserI) {
    return jwt.sign(JSON.parse(JSON.stringify(user)), config.JWT_SECRET, {
      expiresIn: "1h",
    });
  }

  async register(newUser: UserI) {
    return UserService.create(newUser);
  }
  async login(user: UserI, passwordToCompare: string) {
    const signedUser = { ...user };
    const isValid = await this.comparePasswords(passwordToCompare, user.password!);
    // throwing error if password is invalid , will lead to route catch block , and then send the message with the error class helpers
    if (!isValid) throw new Error();
    if (signedUser.password) {
      delete signedUser.password;
    }
    return this.generateToken(user);
  }
}

export default new AuthService();
