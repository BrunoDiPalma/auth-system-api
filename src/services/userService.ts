import { prisma } from "../prisma";
import { loginUserDTO, RegisterUserDTO } from "../schemas/userSchema";
import bcrypt from "bcrypt";
import { UserResponse } from "../types/user";
import { generateToken } from "../utils/generateToken";

export const registerUserService = async (
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

export const loginUserService = async (data: loginUserDTO) => {
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

export const getMeService = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  return {
    id: user.id,
    nome: user.nome,
    email: user.email,
  };
};

export const getUserService = async () => {
  const users = await prisma.user.findMany();

  return users.map((user) => ({
    id: user.id,
    nome: user.nome,
    email: user.email,
  }));
};

export const getUserbyIdService = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error("Usuário não encontrado!");
  }
  return {
    id: user.id,
    nome: user.nome,
    email: user.email,
  };
};

export const updateUserService = async (
  id: string,
  data: {
    nome?: string | undefined;
    email?: string | undefined;
    senha?: string | undefined;
  },
) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error("Usuário não encontrado!");
  }

  if (data.email && data.email !== user.email) {
    const emailExists = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (emailExists) {
      throw new Error("Este e-mail já está em uso!");
    }
  }

  let senhaHash;

  if (data.senha) {
    senhaHash = await bcrypt.hash(data.senha, 10);
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      ...(data.nome && { nome: data.nome }),
      ...(data.email && { email: data.email }),
      ...(senhaHash && { senha: senhaHash }),
    },
  });

  return {
    id: updatedUser.id,
    nome: updatedUser.nome,
    email: updatedUser.email,
  };
};

export const deleteUserService = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  await prisma.user.delete({
    where: { id },
  });

  return { message: "Usuário deletado com sucesso!" };
};
