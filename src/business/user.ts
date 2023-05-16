import { type UserI } from '../interfaces/index';
import { UserService } from '../services';

/**
 * This Class is responsible for the business logic of the user endpoint.
 * @class User Business Logic Class for the user endpoint.
 */
class UserBL {
  async getAll(): Promise<UserI[]> {
    return UserService.getAll();
  }

  async getById(id: string): Promise<UserI | null> {
    return UserService.getById(id);
  }

  async getByUsername(username: string): Promise<UserI | null> {
    return UserService.getByUsername(username);
  }

  async create(newUser: UserI): Promise<UserI> {
    return UserService.create(newUser);
  }

  async update(id: string, updatedUser: UserI): Promise<UserI> {
    return UserService.update(id, updatedUser);
  }

  async delete(user: string): Promise<void> {
    UserService.delete(user);
  }

  async search(query: string): Promise<UserI[]> {
    return UserService.search(query);
  }
}

export default new UserBL();
