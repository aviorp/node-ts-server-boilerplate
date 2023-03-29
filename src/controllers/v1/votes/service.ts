import BaseDalService from '#services/BaseDalService';
import { convertToSingleQuotes, executeStatement } from '#apis/aws/dynamoDB/index';
import { type VoteI } from '#types';

class VotesService extends BaseDalService {
  constructor() {
    super('VOTES');
  }

  async update(id, item, user_id?): Promise<void> {
    let setQuery = 'SET votes=0';
    Object.keys(item).forEach((key) => {
      setQuery += `SET ${key}=${convertToSingleQuotes(item[key])}`;
    });
    const statement = `UPDATE ${this.tableName} ${setQuery} WHERE id=${convertToSingleQuotes(id)} AND user_id=${convertToSingleQuotes(user_id)}`;
    await executeStatement(statement);
  }

  async getVotesByUserId(user_id: string): Promise<VoteI[]> {
    const statement = `SELECT * FROM ${this.tableName} WHERE user_id=${convertToSingleQuotes(user_id)}`;
    return executeStatement(statement);
  }
}

export default new VotesService();
