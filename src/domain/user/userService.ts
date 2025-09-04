import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const checkUserExists = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user
    ? { success: false, message: 'Bu email zaten kayıtlı' }
    : { success: true };
};

export const createUser = async (email: string, username: string, password: string) => {
  const user = await prisma.user.create({
    data: { email, username, password },
  });
  return user;
};

export const getAllUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
}

export const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return null;
  }

  return user;
};

