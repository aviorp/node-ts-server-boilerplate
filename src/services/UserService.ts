import { USER_SERVICE_COLLECTION } from '@/keys';
import { prisma } from '@/db';
import BaseService from './BaseService';

class UserService extends BaseService {
  constructor() {
    super(USER_SERVICE_COLLECTION);
  }

  async getByUsername(username: string): Promise<any> {
    return prisma[USER_SERVICE_COLLECTION].findFirst({
      where: {
        username,
      },
    });
  }
}

export default new UserService();
