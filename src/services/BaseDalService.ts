import { type DbTables } from '#types';
import { executeStatement, convertToSingleQuotes } from '#apis/aws/dynamoDB/index';
import { v4 as uuid } from 'uuid';
class BaseDalService {
  tableName: keyof DbTables;

  constructor(tableName: keyof DbTables) {
    this.tableName = tableName;
  }

  async getAll<T>(_: any, user_id: string): Promise<T[]> {
    const statement = `SELECT * FROM ${this.tableName} WHERE user_id=${convertToSingleQuotes(user_id)}`;
    return executeStatement(statement);
  }

  async getById<T>(id: string): Promise<T[]> {
    const statement = `SELECT * FROM ${this.tableName} WHERE id=${convertToSingleQuotes(id)}`;
    const results = await executeStatement(statement);
    return results[0] ?? null;
  }

  async create<T>(item: T): Promise<void> {
    type newItemI = Omit<T, 'id' | 'created_at'>;
    const newItem: newItemI = item;
    const withId = { id: uuid(), ...newItem, created_at: new Date().toISOString() };
    const statement = `INSERT INTO ${this.tableName} value ${convertToSingleQuotes(withId)}`;
    await executeStatement(statement);
  }

  async update(id: string, item: any): Promise<void> {
    let setQuery = '';
    Object.keys(item).forEach((key) => {
      setQuery += `SET ${key}=${convertToSingleQuotes(item[key])}`;
    });
    const statement = `UPDATE ${this.tableName} ${setQuery} WHERE id=${convertToSingleQuotes(id)}`;
    await executeStatement(statement);
  }

  async delete(id: string): Promise<void> {
    const statement = `DELETE FROM ${this.tableName} WHERE id=${convertToSingleQuotes(id)}`;
    await executeStatement(statement);
  }
}

export default BaseDalService;
