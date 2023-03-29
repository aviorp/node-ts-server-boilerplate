import { type GameI } from './../../../types/index';
import BaseDalService from '#services/BaseDalService';
import { convertToSingleQuotes, executeStatement } from '#apis/aws/dynamoDB/index';
class GamesService extends BaseDalService {
  constructor() {
    super('GAMES');
  }

  async getGamesByGenre<T extends GameI>(genre: string): Promise<T[]> {
    const statement = `SELECT * FROM ${this.tableName} WHERE server_type=${convertToSingleQuotes(genre)}`;
    return executeStatement(statement);
  }

  async getGamesByUserId<T extends GameI>(user_id: string): Promise<T[]> {
    const statement = `SELECT * FROM VOTES WHERE user_id=${convertToSingleQuotes(user_id)}`;
    return executeStatement(statement);
  }
}

export default new GamesService();
