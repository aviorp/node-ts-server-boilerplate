import { prisma } from "./../db";
export default class BaseService {
  model: string;
  constructor(model: string) {
    this.model = model;
  }
  getAll() {
    return prisma[this.model].findMany();
  }
  getById(id: string) {
    return prisma[this.model].findUnique({
      where: {
        id,
      },
    });
  }
  create(payload) {
    return prisma[this.model].create({
      data: payload,
    });
  }
  update(id, payload = {}) {
    return prisma[this.model].update({
      where: {
        id,
      },
      data: payload,
    });
  }
  delete(id) {
    return prisma[this.model].delete({
      where: {
        id,
      },
    });
  }
}
