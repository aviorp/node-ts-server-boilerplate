import { buildFiltersQuery } from '@/db/helpers';
import { prisma } from '@/db';
export default class BaseService {
  model: any;

  constructor(model: string) {
    this.model = prisma[model];
  }

  async getAll(filters = {}): Promise<any> {
    if (Object.keys(filters).length === 0) return this.model.findMany();
    const queryFilters = buildFiltersQuery(filters);
    return this.model.findMany({
      ...queryFilters,
    });
  }

  async getById(id: string): Promise<any> {
    return this.model.findUnique({
      where: {
        id,
      },
    });
  }

  create(payload): void {
    return this.model.create({
      data: {
        ...payload,
        created_at: new Date().toISOString(),
      },
    });
  }

  async update(id, payload = {}): Promise<any> {
    return this.model.update({
      where: {
        id,
      },
      data: payload,
    });
  }

  delete(id): void {
    return this.model.delete({
      where: {
        id,
      },
    });
  }
}
