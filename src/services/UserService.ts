import { prisma } from "./../db/";

class UserService {
  getAll() {
    return prisma.user.findMany({});
  }

  getById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  getByUsername(username: string) {
    return prisma.user.findFirst({
      where: {
        username,
      },
    });
  }

  create(payload) {
    return prisma.user.create({
      data: payload,
    });
  }
  update(id: string, payload = {}) {
    return prisma.user.update({
      where: {
        id,
      },
      data: payload,
    });
  }
  delete(id: string) {
    return prisma.user.delete({
      where: {
        id,
      },
    });
  }
}

export default new UserService();
