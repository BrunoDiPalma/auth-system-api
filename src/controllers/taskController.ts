import { Request, Response } from "express";
import { prisma } from "../prisma";
import { Tasks } from "../types/task";

export async function createTasks(req: Request, res: Response) {
  const { titulo } = req.body;

  const task = await prisma.todo.create({
    data: {
      titulo,
      userId: req.user.id,
    },
  });

  return res.status(201).json(task);
}

export async function getTasks(req: Request, res: Response) {
  const tasks = await prisma.todo.findMany({
    where: {
      userId: req.user!.id,
    },
  });

  return res.json(tasks);
}

export async function updateTasks(req: Request, res: Response) {
  const { id } = req.params;

  if (!id || typeof id !== "string") {
    return res.status(400).json({
      message: "ID inválido!",
    });
  }

  const { titulo, concluida } = req.body;

  const task = await prisma.todo.findUnique({
    where: { id },
  });

  if (!task) {
    return res.status(404).json({ message: "Tarefa não encontrada!" });
  }

  const updateTask = await prisma.todo.update({
    where: { id },
    data: {
      titulo: titulo ?? task.titulo,
      concluida: concluida ?? task.concluida,
    },
  });

  return res.json(updateTask);
}

export async function deleteTask(req: Request, res: Response) {
  const { id } = req.params;

  if (!id || typeof id !== "string") {
    return res.status(400).json({
      message: "ID inválido!",
    });
  }

  const task = await prisma.todo.findUnique({
    where: { id },
  });

  if(!task){
    return res.status(404).json({ message: "Tarefa não encontrada!"})
  }

  await prisma.todo.delete({
    where: { id },
  });

  return res.status(200).json({ message: "Tarefa excluída!" });
}
