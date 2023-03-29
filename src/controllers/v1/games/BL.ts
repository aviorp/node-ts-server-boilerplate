
import { type GameI } from '#types/index.js';
import GamesService from './service.js';

class GamesBL {
  async getAll(req: any, user_id: string): Promise<GameI[]> {
    return GamesService.getAll(req, user_id);
  }

  async getById(id: string): Promise<GameI[] | null> {
    return GamesService.getById(id);
  }

  async create(payload: any): Promise<void> {
    return GamesService.create(payload);
  }

  async update(id, payload: GameI): Promise<void> {
    return GamesService.update(id, payload);
  }

  async delete(id): Promise<void> {
    return GamesService.delete(id);
  }
}

export default new GamesBL();
