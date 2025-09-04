import { Request, Response } from "express";
import { educationService } from "@domain/education";

export const createEducationHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const result = await educationService.createEducation(req.body);

  if ("error" in result) {
    res.status(400).json(result);
    return;
  }

  res.status(201).json(result);
  return;
};

export const getEducationByIdHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ error: "Geçerli bir ID giriniz." });
    return;
  }

  try {
    const education = await educationService.getEducationById(id);
    res.status(200).json(education);
    return;
  } catch (error: any) {
    res.status(404).json({ error: error.message });
    return;
  }
};

export const getEducationsByUserIdHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = parseInt(req.query.userId as string);

  if (isNaN(userId)) {
    res.status(400).json({ error: "Geçerli bir userId giriniz." });
    return;
  }

  try {
    const educations = await educationService.getEducationsByUserId(userId);
    res.status(200).json(educations);
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};
