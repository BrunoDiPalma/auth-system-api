"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskSchema = exports.createTaskSchema = void 0;
const zod_1 = require("zod");
exports.createTaskSchema = zod_1.z.object({
    titulo: zod_1.z
        .string()
        .trim()
        .min(3, "O título deve ter pelo menos 3 caracteres")
        .max(100, "O título deve ter no máximo 100 caracteres"),
    concluida: zod_1.z.boolean().optional(),
});
exports.updateTaskSchema = exports.createTaskSchema.partial();
//# sourceMappingURL=taskSchema.js.map