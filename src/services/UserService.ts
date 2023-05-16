import { prisma } from './../db/';
import BaseService from './BaseService';

class UserService extends BaseService {
  constructor() {
    super('user');
  }

  async getByUsername(username: string): Promise<any> {
    return prisma.user.findFirst({
      where: {
        username,
      },
    });
  }
}

export default new UserService();
