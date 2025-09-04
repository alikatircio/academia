import { Request, Response } from 'express';
import { userService, userValidator } from '@domain/user';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


const handleValidation = (res: Response, result: { error: string } | null) => {
  if (result) {
    return res.status(400).json(result);
  }
};

export const createUserHandler = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  const emptyCheck = userValidator.validateEmptyStrings({ email, username, password });
  if (handleValidation(res, emptyCheck)) return;

  const emailCheck = userValidator.validateEmail(email);
  if (handleValidation(res, emailCheck)) return;

  const userExist = await userService.verifyExistUser(email, username, prisma);
  if (handleValidation(res, userExist)) return;

  try {
    const user = await userService.createUser(email, username, password, prisma);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Kullanıcı oluşturulamadı.', details: error });
  }
};

export const getAllUsersHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users); 
    } catch (error) {
        res.status(500).json({ error: 'Kullanıcılar getirilemedi', details: error });
    }
}

export const getUserByIdHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = Number(req.params.id);

  if (isNaN(userId)) {
    res.status(400).json({ error: 'Geçersiz kullanıcı ID' });
    return;
  }

  const user = await userService.getUserById(userId);

  if (!user) {
    res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    return;
  }

  res.status(200).json(user);
};

