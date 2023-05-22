
import { type Request } from 'express';
import queryBuilder from '@/utils/queryBuilder';
import TransportService from './service';
import { type Transport } from '@prisma/client';
import { USERS_SEARCH_FIELDS } from '@/utils/constants';

/**
 * This Class is responsible for the business logic of the user endpoint.
 * @class Transport Business Logic Class for the user endpoint.
 */
class TransportBL {
  query: any;

  async getAll(req: Request): Promise<Transport[]> {
    this.query = queryBuilder(req, USERS_SEARCH_FIELDS);
    return TransportService.getAll(this.query);
  }

  async getById(req: Request): Promise<Transport | null> {
    this.query = queryBuilder(req);
    return TransportService.getById(this.query);
  }

  async create(req: Request): Promise<Transport> {
    this.query = queryBuilder(req);
    return TransportService.create(this.query);
  }

  async createBulk(req: Request): Promise<Transport> {
    this.query = queryBuilder(req);
    return TransportService.createBulk(this.query);
  }

  async update(req: Request): Promise<Transport> {
    this.query = queryBuilder(req);
    return TransportService.update(this.query);
  }

  async delete(req: Request): Promise<Transport> {
    this.query = queryBuilder(req);
    return TransportService.delete(this.query);
  }
}

export default new TransportBL();
