import { api } from "../api/api";
import type { Task } from "../types/task";

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get("/tasks");

  return response.data;
};

export const createTask = async (titulo: string) => {
  const response = await api.post("/tasks", {
    titulo,
  });

  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

export const updateTask = async (id: string, titulo: string): Promise<Task> => {
  const response = await api.put(`/tasks/${id}`, {
    titulo,
  });

  return response.data;
};
