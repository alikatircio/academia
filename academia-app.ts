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

function handleValidation(
  res: Response,
  result: { error: string } | null,
  defaultMsg = "Kayıt başarısız"
) {
  if (result) {
    res.status(400).json({ error: defaultMsg, details: result });
    return true;
  }
  return false;
}

app.post("/user", async (req: any, res: any) => {
  const email: string = req.body.email;
  const username: string = req.body.username;
  const password: string = req.body.password;

  const checkEmptyString = await helper.validateEmptyStrings({
    email,
    username,
    password,
  });

  handleValidation(res, checkEmptyString);

  const validateEmail = await helper.validateEmail(email);
  handleValidation(res, validateEmail);

  const existUser = await helper.verifyExistUser(req, prisma);
  handleValidation(res, existUser);

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
  handleValidation(res, error);

  const isUserExist = await helper.verifyUserExist(userId, prisma)
  handleValidation(res, isUserExist);

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
