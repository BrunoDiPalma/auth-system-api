import { Request, Response } from "express";
import { prisma } from "../prisma";

export async function createTodo(req: Request, res: Response) {
  const { titulo } = req.body;

  const todo = await prisma.todo.create({
    data: {
      titulo,
      userId: req.user.id,
    },
  });

  return res.status(201).json(todo);
}
