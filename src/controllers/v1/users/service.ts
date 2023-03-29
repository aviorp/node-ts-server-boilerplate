import BaseDalService from '#services/BaseDalService';
import { convertToSingleQuotes, executeStatement } from '#apis/aws/dynamoDB/index';

class UserService extends BaseDalService {
  constructor() {
    super('USERS');
  }

  async create(item: any): Promise<any> {
    const withId = { ...item, created_at: new Date().toISOString() };
    const statement = `INSERT INTO ${this.tableName} value ${convertToSingleQuotes(withId)}`;
    await executeStatement(statement);
  }

  async getByUsername<T>(username: string): Promise<T[] | null> {
    const statement = `SELECT * FROM ${this.tableName} WHERE username = ${username}`;
    const response = await executeStatement(statement);
    return response;
  }
}

export default new UserService();
