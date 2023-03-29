import { type VoteI } from '#types/index.js';
import VotesService from './service.js';

class VotesBL {
  async getAll(_: any, user_id: string): Promise<VoteI[]> {
    return VotesService.getAll(_, user_id);
  }

  async getById(id: string): Promise<VoteI[] | null> {
    return VotesService.getById(id);
  }

  async create(payload: any): Promise<void> {
    return VotesService.create(payload);
  }

  async update(id, payload: VoteI, user_id): Promise<void> {
    return VotesService.update(id, payload, user_id);
  }

  async delete(id): Promise<void> {
    return VotesService.delete(id);
  }
}

export default new VotesBL();
