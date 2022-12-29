import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const initDatabase = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to DB");
  } catch (error) {
    console.log("Error connecting to DB", error);
  }
};
