import express from "express";
import { PrismaClient } from "@prisma/client";
import e, { Request, Response } from "express";
import { Helper } from "./api-helper";

const app = express();
const prisma = new PrismaClient();
const helper = new Helper();
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

app.post("/user", async (req: any, res: any) => {
  const email: string = req.body.email;
  const username: string = req.body.username;
  const password: string = req.body.password;

  const validateEmail = await helper.validateEmail(email);
  console.log(validateEmail);
  if (validateEmail) {
    return res
      .status(400)
      .json({ error: "Kayıt başarısız", details: validateEmail });
  }
  const existUser = await helper.verifyExistUser(req, prisma);
  if (existUser) {
    return res
      .status(400)
      .json({ error: "Kayıt başarısız", details: existUser });
  }

  try {
    const user = await prisma.user.create({
      data: { email, username, password },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Kayıt başarısız", details: error });
  }
});

app.post("/education", async (req: any, res: any) => {
  let { type, city, department, year, userId } = req.body;

  const error = await helper.verifySchoolType(req, prisma);
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
