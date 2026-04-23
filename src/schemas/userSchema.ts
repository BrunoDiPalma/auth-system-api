import { z } from "zod";

export const registerUserSchema = z.object({
  nome: z.string().min(2, "Nome muito curto"),
  email: z.email({ message: "E-mail inválido!" }),
  senha: z.string().min(6, "Senha muito curta"),
});

export type RegisterUserDTO = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.object({
  email: z.email({ message: "E-mail inválido!" }),
  senha: z.string().min(6, "Senha muito curta"),
});

export type loginUserDTO = z.infer<typeof loginUserSchema>;

export const updateUserSchema = z.object({
  nome: z.string().min(2).optional(),
  email: z.email().optional(),
  senha: z.string().min(6).optional(),
});
