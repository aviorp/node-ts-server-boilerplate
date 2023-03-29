import UserService from './service.js';
import VoteService from '../votes/service.js';
import { voteScheduler } from '#jobs/handlers';

interface NewUser {
  subscription_id: string
  slots: any[]
  is_active: boolean
  id: string
}

/**
 * This Class is responsible for the business logic of the user endpoint.
 * @class User Business Logic Class for the user endpoint.
 */
class UserBL {
  query: any;

  async getAll(req: any, user_id: string): Promise<any[]> {
    return UserService.getAll(req, user_id);
  }

  async getById(id: string): Promise<any | null> {
    return UserService.getById(id);
  }

  async getByUsername(username: string): Promise<any | null> {
    return UserService.getByUsername(username);
  }

  async create({ slots, subscription_id, id }: NewUser): Promise<any> {
    const results = await Promise.all([
      UserService.create({ subscription_id, id }),
      ...slots.map(async (slot: any) => VoteService.create(slot)),
    ]);
    await voteScheduler();

    return results[0];
  }

  async update(id: string, item: any): Promise<any> {
    return UserService.update(id, item);
  }

  async delete(id: string): Promise<any> {
    return UserService.delete(id);
  }
}

export default new UserBL();
