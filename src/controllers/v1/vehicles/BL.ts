import { type Request } from 'express';
import queryBuilder from '@/utils/queryBuilder';
import VehicleService from './service';
import { type Vehicle } from '@prisma/client';
import { USERS_SEARCH_FIELDS } from '@/utils/constants';

/**
 * This Class is responsible for the business logic of the user endpoint.
 * @class Vehicle Business Logic Class for the user endpoint.
 */
class VehicleBL {
  query: any;

  async getAll(req: Request): Promise<Vehicle[]> {
    this.query = queryBuilder(req, USERS_SEARCH_FIELDS);
    return VehicleService.getAll(this.query);
  }

  async getById(req: Request): Promise<Vehicle | null> {
    this.query = queryBuilder(req);
    return VehicleService.getById(this.query);
  }

  async create(req: Request): Promise<Vehicle> {
    this.query = queryBuilder(req);
    return VehicleService.create(this.query);
  }

  async createBulk(req: Request): Promise<Vehicle> {
    this.query = queryBuilder(req);
    return VehicleService.createBulk(this.query);
  }

  async update(req: Request): Promise<Vehicle> {
    this.query = queryBuilder(req);
    return VehicleService.update(this.query);
  }

  async delete(req: Request): Promise<Vehicle> {
    this.query = queryBuilder(req);
    return VehicleService.delete(this.query);
  }
}

export default new VehicleBL();
