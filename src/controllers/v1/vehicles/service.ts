import { type Vehicle } from '@prisma/client';
import { prisma } from '@/db';

class VehicleService {
  async getAll(query: any): Promise<Vehicle[]> {
    return prisma.vehicle.findMany(query);
  }

  async getById(query): Promise<Vehicle | null> {
    return prisma.vehicle.findUnique(query);
  }

  async getByVehiclename(query: any): Promise<Vehicle | null> {
    return prisma.vehicle.findUnique(query);
  }

  async create(query: any): Promise<Vehicle> {
    return prisma.vehicle.create(query);
  }

  async createBulk(query): Promise<any> {
    return prisma.vehicle.createMany(query);
  }

  async update(query): Promise<any> {
    return prisma.vehicle.update(query);
  }

  async delete(query): Promise<Vehicle> {
    return prisma.vehicle.delete(query);
  }
}

export default new VehicleService();
