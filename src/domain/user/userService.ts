import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const verifyExistUser = async (
  email: string,
  username: string,
  prisma: PrismaClient
) => {
  const existingEmail = await prisma.user.findFirst({ where: { email } });
  if (existingEmail) {
    return { error: `${email} zaten kayıtlı.` };
  }

  const existingUsername = await prisma.user.findFirst({ where: { username } });
  if (existingUsername) {
    return { error: `${username} kullanıcı adı zaten kullanımda.` };
  }

  return null;
};

export const createUser = async (
  email: string,
  username: string,
  password: string,
  prisma: PrismaClient
) => {
  return prisma.user.create({
    data: {
      email,
      username,
      password,
    },
  });
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




