import logger from '@/utils/logger';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const initDatabase: any = async () => {
  try {
    await prisma.$connect();
    logger.success('Connected to DB');
  } catch (error) {
    logger.error(`Error connecting to DB ${error}`);
  }
};
