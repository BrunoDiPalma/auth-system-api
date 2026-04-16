import { RegisterUserDTO } from "../schemas/userSchema";
import { UserResponse } from "../types/user";
import bcrypt from "bcrypt";

export const registerUser = async (
  data: RegisterUserDTO,
): Promise<UserResponse> => {

    const { nome, email, senha} = data

    const senhaHash = await bcrypt.hash(senha,10)

    console.log("Senha original:", senha)
    console.log("Senha Hash:", senhaHash)

    return {
    id: 1,
    nome: data.nome,
    email: data.email,
  };
};
