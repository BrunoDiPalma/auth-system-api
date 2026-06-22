"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserService = exports.updateUserService = exports.getUserbyIdService = exports.getUserService = exports.getMeService = exports.loginUserService = exports.registerUserService = void 0;
const prisma_1 = require("../prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_1 = require("../utils/generateToken");
const AppError_1 = require("../errors/AppError");
const registerUserService = async (data) => {
    const { nome, email, senha } = data;
    const userExists = await prisma_1.prisma.user.findUnique({
        where: { email },
    });
    if (userExists) {
        throw new AppError_1.AppError("Este e-mail já está em uso", 409);
    }
    const senhaHash = await bcrypt_1.default.hash(senha, 10);
    const user = await prisma_1.prisma.user.create({
        data: {
            nome,
            email,
            senha: senhaHash,
        },
    });
    return {
        id: user.id,
        nome: user.nome,
        email: user.email,
    };
};
exports.registerUserService = registerUserService;
const loginUserService = async (data) => {
    const { email, senha } = data;
    const user = await prisma_1.prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new AppError_1.AppError("E-mail ou senha inválidos!", 401);
    }
    const senhaValida = await bcrypt_1.default.compare(senha, user.senha);
    if (!senhaValida) {
        throw new AppError_1.AppError("E-mail ou senha inválidos!", 401);
    }
    const token = (0, generateToken_1.generateToken)(user.id);
    return {
        user: {
            id: user.id,
            nome: user.nome,
            email: user.email,
        },
        token,
    };
};
exports.loginUserService = loginUserService;
const getMeService = async (userId) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new AppError_1.AppError("Usuário não encontrado", 404);
    }
    return {
        id: user.id,
        nome: user.nome,
        email: user.email,
    };
};
exports.getMeService = getMeService;
const getUserService = async () => {
    const users = await prisma_1.prisma.user.findMany();
    return users.map((user) => ({
        id: user.id,
        nome: user.nome,
        email: user.email,
    }));
};
exports.getUserService = getUserService;
const getUserbyIdService = async (id) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id },
    });
    if (!user) {
        throw new AppError_1.AppError("Usuário não encontrado!", 404);
    }
    return {
        id: user.id,
        nome: user.nome,
        email: user.email,
    };
};
exports.getUserbyIdService = getUserbyIdService;
const updateUserService = async (id, data) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id },
    });
    if (!user) {
        throw new AppError_1.AppError("Usuário não encontrado!", 404);
    }
    if (data.email && data.email !== user.email) {
        const emailExists = await prisma_1.prisma.user.findUnique({
            where: { email: data.email },
        });
        if (emailExists) {
            throw new AppError_1.AppError("Este e-mail já está em uso!", 409);
        }
    }
    let senhaHash;
    if (data.senha) {
        senhaHash = await bcrypt_1.default.hash(data.senha, 10);
    }
    const updatedUser = await prisma_1.prisma.user.update({
        where: { id },
        data: {
            ...(data.nome && { nome: data.nome }),
            ...(data.email && { email: data.email }),
            ...(senhaHash && { senha: senhaHash }),
        },
    });
    return {
        id: updatedUser.id,
        nome: updatedUser.nome,
        email: updatedUser.email,
    };
};
exports.updateUserService = updateUserService;
const deleteUserService = async (id) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id },
    });
    if (!user) {
        throw new AppError_1.AppError("Usuário não encontrado", 404);
    }
    await prisma_1.prisma.user.delete({
        where: { id },
    });
    return { message: "Usuário deletado com sucesso!" };
};
exports.deleteUserService = deleteUserService;
//# sourceMappingURL=userService.js.map