import { prisma } from "./../db/";
import BaseService from "./BaseService";

class UserService extends BaseService {
  constructor() {
    super("user");
  }
  getByUsername(username: string) {
    return prisma.user.findFirst({
      where: {
        username,
      },
    });
  }
}

export default new UserService();
