import { type Request } from 'express';
import { type User } from '@prisma/client';
import { prisma } from '@/db';
import queryBuilder from '@/utils/queryBuilder';

class UserService {
  async getAll(req: Request): Promise<User[]> {
    return prisma.user.findMany(queryBuilder(req));
  }

  async getById(req: Request): Promise<User | null> {
    return prisma.user.findUnique(queryBuilder(req));
  }

  async getByUsername(req: any): Promise<User | null> {
    return prisma.user.findUnique(queryBuilder(req));
  }

  async create(req: Request): Promise<User> {
    return prisma.user.create(queryBuilder(req));
  }

  async createBulk(query): Promise<any> {
    return prisma.user.createMany(query);
  }

  async update(query): Promise<any> {
    return prisma.user.update(query);
  }

  async delete(query): Promise<User> {
    return prisma.user.delete(query);
  }
}

export default new UserService();
