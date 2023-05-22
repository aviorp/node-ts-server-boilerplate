import { type Request } from 'express';
import { type User } from '@prisma/client';
import UserService from './service';

/**
 * This Class is responsible for the business logic of the user endpoint.
 * @class User Business Logic Class for the user endpoint.
 */
class UserBL {
  query: any;

  async getAll(req: Request): Promise<User[]> {
    return UserService.getAll(req);
  }

  async getById(req: Request): Promise<User | null> {
    return UserService.getById(req);
  }

  async getByUsername(req: Request): Promise<User | null> {
    return UserService.getByUsername(req);
  }

  async create(req: Request): Promise<User> {
    return UserService.create(req);
  }

  async createBulk(req: Request): Promise<User> {
    return UserService.createBulk(req);
  }

  async update(req: Request): Promise<User> {
    return UserService.update(req);
  }

  async delete(req: Request): Promise<User> {
    return UserService.delete(req);
  }
}

export default new UserBL();
