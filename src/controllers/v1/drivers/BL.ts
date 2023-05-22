import { type Request } from 'express';
import { type Driver } from '@prisma/client';
import DriverService from './service';

/**
 * This Class is responsible for the business logic of the user endpoint.
 * @class Driver Business Logic Class for the user endpoint.
 */
class DriverBL {
  query: any;

  async getAll(req: Request): Promise<Driver[]> {
    return DriverService.getAll(req);
  }

  async getById(req: Request): Promise<Driver | null> {
    return DriverService.getById(req);
  }

  async create(req: Request): Promise<Driver> {
    return DriverService.create(req);
  }

  async createBulk(req: Request): Promise<Driver> {
    return DriverService.createBulk(req);
  }

  async update(req: Request): Promise<Driver> {
    return DriverService.update(req);
  }

  async delete(req: Request): Promise<Driver> {
    return DriverService.delete(req);
  }
}

export default new DriverBL();
