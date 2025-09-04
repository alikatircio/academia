import { Request, Response } from 'express';
import { userService, userValidator } from '@domain/user';




export const createUserHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, username, password } = req.body;

  const emptyCheck = userValidator.validateEmptyStrings({ email, username, password });
  if (!emptyCheck.success) {
    res.status(400).json({ error: emptyCheck.message });
    return;
  }

  const emailCheck = userValidator.validateEmail(email);
  if (!emailCheck.success) {
    res.status(400).json({ error: emailCheck.message });
    return;
  }

  const exists = await userService.checkUserExists(email);
  if (!exists.success) {
    res.status(400).json({ error: exists.message });
    return;
  }

  try {
    const user = await userService.createUser(email, username, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Kullanıcı oluşturulamadı', details: error });
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

