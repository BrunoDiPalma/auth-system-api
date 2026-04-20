import { RegisterUserDTO, loginUserDTO } from "../schemas/userSchema";
import { UserResponse } from "../types/user";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";

let fakeUser: any = null;

export const registerUser = async (
  data: RegisterUserDTO,
): Promise<UserResponse> => {
  const { nome, email, senha } = data;
  const senhaHash = await bcrypt.hash(senha, 10);

  fakeUser = {
    id: 1,
    nome,
    email,
    senha: senhaHash,
  };
  return {
    id: 1,
    nome,
    email,
  };
};

export const loginUser = async (data: loginUserDTO) => {
  const { email, senha } = data;

  if (!fakeUser || email != fakeUser.email) {
    throw new Error("Credenciais inválidas");
  }

  const senhaValida = await bcrypt.compare(senha, fakeUser.senha);

  if (!senhaValida) {
    throw new Error("Credenciais inválidas");
  }

  const token = generateToken(fakeUser.id.toString());

  return {
    user: {
      id: fakeUser.id,
      nome: fakeUser.nome,
      email: fakeUser.email,
    },
    token,
  };
};
