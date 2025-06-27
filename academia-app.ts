import express from "express";
import { PrismaClient } from "@prisma/client";
import { SchoolType } from "@prisma/client";
import { Request, Response } from "express";

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

app.post("/user", async (req, res) => {
  const email: string = req.body.email;
  const username: string = req.body.username;
  const password: string = req.body.password;

  try {
    const user = await prisma.user.create({
      data: { email, username, password },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Kayıt başarısız", details: error });
  }
});

async function verifySchoolType(req: any): Promise<{ error: string } | null> {
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

app.post("/education", async (req: any, res: any) => {
  let { type, city, department, year, userId } = req.body;

  const error = await verifySchoolType(req);
  if (error) {
    return res.status(400).json(error);
  }

  try {
    const education = await prisma.education.create({
      data: {
        type,
        city,
        department: department || null,
        year: Number(year),
        userId: Number(userId),
      },
    });
    res.status(201).json(education);
  } catch (error) {
    res.status(500).json({ error: "Kayıt başarısız", details: error });
  }
});

app.get("/user/education/:userId", async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  try {
    const educations = await prisma.education.findMany({
      where: { userId },
    });
    res.json(educations);
  } catch (error) {
    res.status(500).json({ error: "Veritabanı hatası", details: error });
  }
});
