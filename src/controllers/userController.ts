import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/userService";
import { loginUserSchema, registerUserSchema } from "../schemas/userSchema";

export const login = async (req: Request, res: Response) => {
  const parsed = loginUserSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: parsed.error.issues,
    });
  }

  try {
    const user = await loginUser(parsed.data);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(401).json({ message: "E-mail ou senha inválidos" });
  }
};

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
