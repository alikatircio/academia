import { PrismaClient } from "@prisma/client";
import { educationValidator } from "@domain/education/";
const prisma = new PrismaClient();

export const createEducation = async (data: any) => {
  const error = await educationValidator.verifySchoolType(data, prisma);
  if (error) return { error };

  const userError = await educationValidator.verifyUserExist(
    data.userId,
    prisma
  );
  if (userError) return { error: userError.error };

  try {
    const education = await prisma.education.create({
      data: {
        type: data.type,
        city: data.city,
        department: data.department || null,
        year: Number(data.year),
        userId: Number(data.userId),
      },
    });

    return education;
  } catch (err) {
    return { error: "Kayıt başarısız", details: err };
  }
};

export const getEducationById = async (id: number) => {
  const education = await prisma.education.findUnique({
    where: { id },
  });

  if (!education) {
    throw new Error(`ID ${id} ile eşleşen bir eğitim kaydı bulunamadı.`);
  }

  return education;
};

export const getEducationsByUserId = async (userId: number) => {
  const educations = await prisma.education.findMany({
    where: { userId },
  });

  return educations;
};
