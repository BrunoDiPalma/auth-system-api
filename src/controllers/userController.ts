import { Request, Response } from "express";

export const register = (req: Request, res: Response) => {
  const { nome, email, senha } = req.body;

  console.log(nome, email, senha);

  return res.status(201).json({
    message: "Usuário registrado (simulação)",
  });
};
