import { BatchExecuteStatementCommand, DynamoDBClient, ExecuteStatementCommand } from '@aws-sdk/client-dynamodb';
import { OPTIONS } from '../constants.js';
import { unmarshall } from '@aws-sdk/util-dynamodb';

const dbClient = new DynamoDBClient(OPTIONS);

export async function executeStatement(statement): Promise<any[]> {
  if (!statement) throw new Error('No statement provided');
  const command = new ExecuteStatementCommand({
    Statement: statement,
  });
  const { Items } = await dbClient.send(command);
  return Items?.map((item) => unmarshall(item)) ?? [];
}

export async function batchExecuteStatement(statements): Promise<any> {
  const command = new BatchExecuteStatementCommand({
    Statements: statements,
  });
  const { Responses } = await dbClient.send(command);
  return Responses;
}

export function convertToSingleQuotes(value): string {
  const toString = JSON.stringify(value);
  const singleQuotedString = toString.replace(/"/g, "'");
  return singleQuotedString;
}

// class SelectQueryBuilder<Table extends DbTableName, Keys extends Array<keyof DbTables[Table]> | '*'> {
//   private readonly selectClause = '';

//   private whereClause = '';

//   private readonly db: DynamoDB;

//   private readonly table: Table;

//   constructor(keys: Keys, table: Table, db: DynamoDB) {
//     this.selectClause = keys === '*' ? '*' : keys.join(',');
//     this.table = table;
//     this.db = db;
//   }

//   where<Key extends keyof DbTables[Table]>(key: Key, value: DbTables[Table][Key]): any {
//     const qKey = this.whereClause ? ' AND' : 'WHERE';
//     this.whereClause += `${qKey} ${String(key)} = ${this.db.stringify(value)}`;
//     return this;
//   }

//   async exec(): Promise<void> {
//     const query = `SELECT ${this.selectClause} FROM ${this.table} ${this.whereClause}`;
//     return this.db.executeStatement<Keys extends '*' ? DbTables[Table] : Pick<DbTables[Table], Keys[number] & keyof DbTables[Table]>>(query);
//   }
// }

// interface Vote {
//   id: string
//   user_id: string
//   created_at: string
//   daily_votes: number | null
//   game_id: string
//   server_name?: string
//   username: string
//   votes: number
//   vote_id?: string

// }

// export interface DbTables {
//   'VOTES': Vote
// }

// export type DbTableName = keyof DbTables;

// class DynamoDB extends DynamoDBClient {
//   async executeStatement<T>(statement: string): Promise<T[]> {
//     let NextToken;
//     const Items = [];
//     do {
//       const command: any = new ExecuteStatementCommand({
//         Statement: statement,
//         NextToken,
//       });
//       const response: any = await this.send(command);
//       // @ts-expect-error
//       Items.push(...response.Items);
//       NextToken = response.NextToken;
//     } while (NextToken);

//     return Items.map(item => unmarshall(item)) as any & Promise<T[]>;
//   }

//   stringify(value: Record<string, any> | string | number | boolean): string | null {
//     if (value === undefined) return null;
//     const lastKey = Object.keys(value).pop();
//     let objString = '';
//     if (typeof value === 'object') {
//       objString += '{';
//       for (const key in value) {
//         objString += `'${key}':${this.stringify(value[key])}`;
//         if (key !== lastKey) {
//           objString += ',';
//         }
//       }
//       objString += '}';
//     } else if (typeof value === 'string') {
//       objString += `'${value.replace(/'/g, "''")}'`;
//     } else if (typeof value === 'number' || typeof value === 'boolean') {
//       objString += value;
//     }
//     return objString;
//   }

//   selectFrom<Table extends DbTableName>(table: Table): any {
//     return {
//       select: <Keys extends Array<keyof DbTables[Table]> | '*'>(keys: Keys) => {
//         return new SelectQueryBuilder<Table, Keys>(keys, table, this);
//       },
//     };
//   }
// }
