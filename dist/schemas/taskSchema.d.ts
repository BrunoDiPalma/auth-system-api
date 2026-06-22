import { z } from "zod";
export declare const createTaskSchema: z.ZodObject<{
    titulo: z.ZodString;
    concluida: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export type CreateTaskDTO = z.infer<typeof createTaskSchema>;
export declare const updateTaskSchema: z.ZodObject<{
    titulo: z.ZodOptional<z.ZodString>;
    concluida: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
export type UpdateTaskDTO = z.infer<typeof updateTaskSchema>;
//# sourceMappingURL=taskSchema.d.ts.map