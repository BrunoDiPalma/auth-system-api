import { z } from "zod";
export declare const registerUserSchema: z.ZodObject<{
    nome: z.ZodString;
    email: z.ZodEmail;
    senha: z.ZodString;
}, z.core.$strip>;
export type RegisterUserDTO = z.infer<typeof registerUserSchema>;
export declare const loginUserSchema: z.ZodObject<{
    email: z.ZodEmail;
    senha: z.ZodString;
}, z.core.$strip>;
export type loginUserDTO = z.infer<typeof loginUserSchema>;
export declare const updateUserSchema: z.ZodObject<{
    nome: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodEmail>;
    senha: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=userSchema.d.ts.map