import { UserI } from "../interfaces/index";
import { UserService } from "../services";

/**
 * This Class is responsible for the business logic of the user endpoint.
 * @class User Business Logic Class for the user endpoint.
 */
class UserBL {
  getAll() {
    return UserService.getAll();
  }
  getById(id: string) {
    return UserService.getById(id);
  }

  create(newUser: UserI) {
    return UserService.create(newUser);
  }
  update(id: string, updatedUser: UserI) {
    return UserService.update(id, updatedUser);
  }
  delete(user: string) {
    return UserService.delete(user);
  }
}

export default new UserBL();