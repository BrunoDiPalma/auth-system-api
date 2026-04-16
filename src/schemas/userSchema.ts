import { z } from "zod";

export const registerUserSchema = z.object({
  nome: z.string().min(2, "Nome muito curto"),
  email: z.email("E-mail inválido!"),
  senha: z.string().min(6, "Senha muito curta"),
});
