import { type Transport } from '@prisma/client';
import { prisma } from '@/db';

class TransportService {
  async getAll(query: any): Promise<Transport[]> {
    return prisma.transport.findMany(query);
  }

  async getById(query): Promise<Transport | null> {
    return prisma.transport.findUnique(query);
  }

  async getByTransportname(query: any): Promise<Transport | null> {
    return prisma.transport.findUnique(query);
  }

  async create(query: any): Promise<Transport> {
    return prisma.transport.create(query);
  }

  async createBulk(query): Promise<any> {
    return prisma.transport.createMany(query);
  }

  async update(query): Promise<any> {
    return prisma.transport.update(query);
  }

  async delete(query): Promise<Transport> {
    return prisma.transport.delete(query);
  }
}

export default new TransportService();
