import { RegisterUserDTO, UserResponse } from "../types/user";
import { registerUserSchema } from "../schemas/userSchema";

export const registerUser = (data: RegisterUserDTO): UserResponse => {
  const { nome, email } = data;

  return {
    id: 1,
    nome: data.nome,
    email: data.email,
  };
};
