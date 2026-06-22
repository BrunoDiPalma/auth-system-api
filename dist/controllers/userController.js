"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserbyId = exports.getUsers = exports.getMe = exports.login = exports.register = void 0;
const userSchema_1 = require("../schemas/userSchema");
const userService_1 = require("../services/userService");
const register = async (req, res) => {
    const parsed = userSchema_1.registerUserSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            message: parsed.error.issues[0]?.message,
        });
    }
    const user = await (0, userService_1.registerUserService)(parsed.data);
    return res.status(201).json(user);
};
exports.register = register;
const login = async (req, res) => {
    const parsed = userSchema_1.loginUserSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            error: parsed.error.issues,
        });
    }
    try {
        const user = await (0, userService_1.loginUserService)(parsed.data);
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(401).json({
            message: "E-mail ou senha inválidos",
        });
    }
};
exports.login = login;
const getMe = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await (0, userService_1.getMeService)(userId);
        return res.json(user);
    }
    catch (error) {
        return res.status(404).json({
            message: "Usuário não encontrado",
        });
    }
};
exports.getMe = getMe;
const getUsers = async (req, res) => {
    try {
        const users = await (0, userService_1.getUserService)();
        return res.json(users);
    }
    catch (error) {
        return res.status(500).json({
            message: "Erro ao buscar usuários",
        });
    }
};
exports.getUsers = getUsers;
const getUserbyId = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || typeof id !== "string") {
            return res.status(400).json({
                message: "ID inválido!",
            });
        }
        const user = await (0, userService_1.getUserbyIdService)(id);
        return res.json(user);
    }
    catch (error) {
        return res.status(404).json({
            message: "Erro ao buscar usuário",
        });
    }
};
exports.getUserbyId = getUserbyId;
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || typeof id !== "string") {
            return res.status(400).json({
                message: "ID inválido!",
            });
        }
        const parsed = userSchema_1.updateUserSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json(parsed.error.issues);
        }
        const updatedUser = await (0, userService_1.updateUserService)(id, parsed.data);
        return res.json(updatedUser);
    }
    catch (error) {
        return res.status(400).json({
            message: "Erro ao atualizar usuário",
        });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || typeof id !== "string") {
            return res.status(400).json({
                message: "ID inválido",
            });
        }
        const result = await (0, userService_1.deleteUserService)(id);
        return res.json(result);
    }
    catch (error) {
        return res.status(404).json({
            message: "Erro ao excluir usuário",
        });
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map