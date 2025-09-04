import { PrismaClient, SchoolType } from '@prisma/client';

export const verifySchoolType = async (
  data: any,
  prisma: PrismaClient
): Promise<{ error: string } | null> => {
  const { type, department, userId } = data;

  if (!Object.values(SchoolType).includes(type)) {
    return { error: 'Geçersiz eğitim tipi!' };
  }

  if (type !== SchoolType.UNI && department) {
    return { error: 'department bilgisi sadece UNI için gönderilebilir.' };
  }

  if (type === SchoolType.UNI && !department) {
    return { error: 'UNI tipi eğitimde department alanı zorunludur.' };
  }

  const existingEducation = await prisma.education.findFirst({
    where: {
      userId: Number(userId),
      type,
    },
  });

  if (existingEducation) {
    return { error: `Bu kullanıcıya ait zaten bir ${type} eğitimi mevcut!` };
  }

  return null;
};

export const verifyUserExist = async (
  id: number,
  prisma: PrismaClient
): Promise<{ error: string } | null> => {
  const isUserExist = await prisma.user.findUnique({
    where: { id },
  });

  if (!isUserExist) {
    return {
      error: `İlgili ${id} userId için kullanıcı bulunmamaktadır`,
    };
  }

  return null;
};
