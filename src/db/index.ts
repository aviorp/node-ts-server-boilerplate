import logger from '@/utils/logger';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn'],
  errorFormat: 'minimal',
  datasources: {
    db: {
      url: process.env.DB_URI,
    },
  },
});

export const initDatabase: any = async () => {
  try {
    await prisma.$connect();
    logger.success('Connected to DB');
  } catch (error) {
    logger.error(`Error connecting to DB ${error}`);
  }
};
