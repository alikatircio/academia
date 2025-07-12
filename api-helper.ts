import { SchoolType } from "@prisma/client";

export class Helper {
  async validateEmail(email: string): Promise<{ error: string } | null> {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return { error: `'${email}' email formatı için uygun değildir.` };
    }
    return null;
  }

  async verifyExistUser(
    req: any,
    prisma: any
  ): Promise<{ error: string } | null> {
    let { email, username } = req.body;
    const existingEmail = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    const existingUsername = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (existingEmail) {
      return { error: "email adresi kullanılmaktadır." };
    }
    if (existingUsername) {
      return { error: "username kullanılmaktadır." };
    }
    return null;
  }

  async verifySchoolType(
    req: any,
    prisma: any
  ): Promise<{ error: string } | null> {
    let { type, department, userId } = req.body;

    if (!Object.values(SchoolType).includes(type)) {
      return { error: "Geçersiz eğitim tipi!" };
    }

    if (type !== SchoolType.UNI && department) {
      return { error: "department bilgisi sadece UNI için gönderilebilir." };
    }

    if (type === SchoolType.UNI && !department) {
      return { error: "UNI tipi eğitimde department alanı zorunludur." };
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
  }
}
