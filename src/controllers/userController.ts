import { Request, Response } from "express";
import { registerUser } from "../services/userService";
import { registerUserSchema } from "../schemas/userSchema";

export const register = async (req: Request, res: Response) => {
  const parsed = registerUserSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: parsed.error.issues,
    });
  }
  const user = await registerUser(parsed.data);

  return res.status(201).json(user);
};
