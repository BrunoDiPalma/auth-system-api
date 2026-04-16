import { RegisterUserDTO } from "../schemas/userSchema";
import { UserResponse } from "../types/user";

export const registerUser = (data: RegisterUserDTO): UserResponse => {
  return {
    id: 1,
    nome: data.nome,
    email: data.email,
  };
};
