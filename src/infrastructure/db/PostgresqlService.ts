import { Config } from '../../config';
const { Pool } = require('pg');

export class PostgresService {
  pool;
  create() {
    this.pool = new Pool(Config.postgresConnection);
  }

  // private cache: NodeCache;
  constructor() {
    this.create();
  }

  async query(sql: string, parameters: any[] = []): Promise<any[]> {
    const client = await this.pool.connect();
    try {
      return await client.query(sql, parameters);
    } finally {
      client.release();
    }
  }

  async getClient() {
    return await this.pool.connect();
  }

}
