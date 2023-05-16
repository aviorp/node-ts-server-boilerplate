import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const initDatabase: any = async () => {
  try {
    await prisma.$connect();
    console.log('\x1b[32m%s\x1b[0m', '✔️', 'Connected to DB');
  } catch (error) {
    console.log('Error connecting to DB', error);
  }
};
