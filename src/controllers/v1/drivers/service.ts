import { type Request } from 'express';
import { type Driver } from '@prisma/client';
import { prisma } from '@/db';
import queryBuilder from '@/utils/queryBuilder';

class DriverService {
  async getAll(req: Request): Promise<Driver[]> {
    return prisma.driver.findMany(queryBuilder(req));
  }

  async getById(req: Request): Promise<Driver | null> {
    return prisma.driver.findUnique(queryBuilder(req));
  }

  async getByDrivername(req: any): Promise<Driver | null> {
    return prisma.driver.findUnique(queryBuilder(req));
  }

  async create(req: Request): Promise<Driver> {
    return prisma.driver.create(queryBuilder(req));
  }

  async createBulk(query): Promise<any> {
    return prisma.driver.createMany(query);
  }

  async update(query): Promise<any> {
    return prisma.driver.update(query);
  }

  async delete(query): Promise<Driver> {
    return prisma.driver.delete(query);
  }
}

export default new DriverService();
