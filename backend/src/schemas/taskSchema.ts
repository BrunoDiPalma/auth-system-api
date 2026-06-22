import { z } from "zod";

export const createTaskSchema = z.object({
  titulo: z
    .string()
    .trim()
    .min(3, "O título deve ter pelo menos 3 caracteres")
    .max(100, "O título deve ter no máximo 100 caracteres"),

  concluida: z.boolean().optional(),
});

export type CreateTaskDTO = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = createTaskSchema.partial();

export type UpdateTaskDTO = z.infer<typeof updateTaskSchema>;
