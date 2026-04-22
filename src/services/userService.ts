import { prisma } from "../prisma";
import { loginUserDTO, RegisterUserDTO } from "../schemas/userSchema";
import bcrypt from "bcrypt";
import { UserResponse } from "../types/user";
import { generateToken } from "../utils/generateToken";

export const registerUser = async (
  data: RegisterUserDTO,
): Promise<UserResponse> => {
  const { nome, email, senha } = data;

  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    throw new Error("Este e-mail já está em uso");
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  const user = await prisma.user.create({
    data: {
      nome,
      email,
      senha: senhaHash,
    },
  });

  return {
    id: user.id,
    nome: user.nome,
    email: user.email,
  };
};

export const loginUser = async (data: loginUserDTO) => {
  const { email, senha } = data;

  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new Error("E-mail ou senha inválidos!");
  }

  const senhaValida = await bcrypt.compare(senha, user.senha);

  if (!senhaValida) {
    throw new Error("E-mail ou senha inválidos!");
  }

  const token = generateToken(user.id);

  return {
    user: {
      id: user.id,
      nome: user.nome,
      email: user.email,
    },
    token,
  };
};
