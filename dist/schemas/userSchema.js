"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.loginUserSchema = exports.registerUserSchema = void 0;
const zod_1 = require("zod");
exports.registerUserSchema = zod_1.z.object({
    nome: zod_1.z.string().min(2, "Nome muito curto"),
    email: zod_1.z.email({ message: "E-mail inválido!" }),
    senha: zod_1.z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});
exports.loginUserSchema = zod_1.z.object({
    email: zod_1.z.email({ message: "E-mail inválido!" }),
    senha: zod_1.z.string().min(6, "Senha muito curta"),
});
exports.updateUserSchema = zod_1.z.object({
    nome: zod_1.z.string().min(2).optional(),
    email: zod_1.z.email().optional(),
    senha: zod_1.z.string().min(6).optional(),
});
//# sourceMappingURL=userSchema.js.map