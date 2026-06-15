import { Request, Response } from "express";
import { prisma } from "../prisma";
import { createTaskSchema, updateTaskSchema } from "../schemas/taskSchema";

export async function createTasks(req: Request, res: Response) {
  const taskData = createTaskSchema.parse(req.body);

  const existingTask = await prisma.todo.findFirst({
    where: {
      titulo: taskData.titulo,
      userId: req.user.id
    }
  })

  if(existingTask){
    return res.status(400).json({ message: "Você já adicionou essa tarefa"})
  }

  const task = await prisma.todo.create({
    data: {
      titulo: taskData.titulo,
      concluida: taskData.concluida ?? false,
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
    return res.status(400).json({ message: "ID inválido!" });
  }

  const taskData = updateTaskSchema.parse(req.body);

  const task = await prisma.todo.findFirst({
    where: { id,
      userId: req.user.id
     },
  });

  if (!task) {
    return res.status(404).json({ message: "Tarefa não encontrada!" });
  }

  const updatedTask = await prisma.todo.update({
    where: { id },
    data: {
      titulo: taskData.titulo ?? task.titulo,
      concluida: taskData.concluida ?? task.concluida,
    },
  });

  return res.json(updatedTask);
}

export async function deleteTask(req: Request, res: Response) {
  const { id } = req.params;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "ID inválido!" });
  }

  const task = await prisma.todo.findFirst({
    where: { id,
      userId: req.user.id
     },
  });

  if (!task) {
    return res.status(404).json({ message: "Tarefa não encontrada!" });
  }

  await prisma.todo.delete({
    where: { id },
  });

  return res.status(200).json({ message: "Tarefa excluída!" });
}
