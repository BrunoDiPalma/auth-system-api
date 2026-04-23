import { Request, Response } from "express";
import { loginUserSchema, registerUserSchema, updateUserSchema } from "../schemas/userSchema";
import {
  getMeService,
  loginUserService,
  registerUserService,
  getUserService,
  getUserbyIdService,
  updateUserService,
  deleteUserService
} from "../services/userService";

export const register = async (req: Request, res: Response) => {
  const parsed = registerUserSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json(parsed.error.issues);
  }

  const user = await registerUserService(parsed.data);

  return res.status(201).json(user);
};

export const login = async (req: Request, res: Response) => {
  const parsed = loginUserSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: parsed.error.issues,
    });
  }
  try {
    const user = await loginUserService(parsed.data);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(401).json({
      message: "E-mail ou senha inválidos",
    });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const user = await getMeService(userId);

    return res.json(user);
  } catch (error) {
    return res.status(404).json({
      message: "Usuário não encontrado",
    });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUserService();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar usuários",
    });
  }
};

export const getUserbyId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res.status(400).json({
        message: "ID inválido!",
      });
    }

    const user = await getUserbyIdService(id);
    return res.json(user);
  } catch (error) {
    return res.status(404).json({
      message: "Erro ao buscar usuário",
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if(!id || typeof id !== "string"){
      return res.status(400).json({
        message: "ID inválido!"
      })
    }

    const parsed = updateUserSchema.safeParse(req.body)

    if(!parsed.success){
      return res.status(400).json(parsed.error.issues)
    }

    const updatedUser = await updateUserService(id, parsed.data)

    return res.json(updatedUser)
  } catch (error) {
    return res.status(400).json({
      message: "Erro ao atualizar usuário"
    })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if(!id || typeof id !== "string"){
      return res.status(400).json({
        message: "ID inválido"
      })
    }

    const result = await deleteUserService(id)

    return res.json(result)
  } catch (error) {
    return res.status(404).json({
      message: "Erro ao excluir usuário"
    })
  }
}