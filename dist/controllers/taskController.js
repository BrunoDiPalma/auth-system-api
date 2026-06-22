"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTasks = createTasks;
exports.getTasks = getTasks;
exports.updateTasks = updateTasks;
exports.deleteTask = deleteTask;
const prisma_1 = require("../prisma");
const taskSchema_1 = require("../schemas/taskSchema");
async function createTasks(req, res) {
    const taskData = taskSchema_1.createTaskSchema.parse(req.body);
    const existingTask = await prisma_1.prisma.todo.findFirst({
        where: {
            titulo: taskData.titulo,
            userId: req.user.id,
        },
    });
    if (existingTask) {
        return res.status(400).json({ message: "Você já adicionou essa tarefa" });
    }
    const task = await prisma_1.prisma.todo.create({
        data: {
            titulo: taskData.titulo,
            concluida: taskData.concluida ?? false,
            userId: req.user.id,
        },
    });
    return res.status(201).json(task);
}
async function getTasks(req, res) {
    const tasks = await prisma_1.prisma.todo.findMany({
        where: {
            userId: req.user.id,
        },
    });
    return res.json(tasks);
}
async function updateTasks(req, res) {
    const { id } = req.params;
    if (!id || typeof id !== "string") {
        return res.status(400).json({ message: "ID inválido!" });
    }
    const taskData = taskSchema_1.updateTaskSchema.parse(req.body);
    const task = await prisma_1.prisma.todo.findFirst({
        where: { id, userId: req.user.id },
    });
    if (!task) {
        return res.status(404).json({ message: "Tarefa não encontrada!" });
    }
    const tituloFinal = taskData.titulo ?? task.titulo;
    const existingTask = await prisma_1.prisma.todo.findFirst({
        where: {
            titulo: tituloFinal,
            userId: req.user.id,
            NOT: {
                id,
            },
        },
    });
    if (existingTask) {
        return res
            .status(400)
            .json({ message: "Você já possui uma tarefa com este título!" });
    }
    const updatedTask = await prisma_1.prisma.todo.update({
        where: { id },
        data: {
            titulo: taskData.titulo ?? task.titulo,
            concluida: taskData.concluida ?? task.concluida,
        },
    });
    return res.json(updatedTask);
}
async function deleteTask(req, res) {
    const { id } = req.params;
    if (!id || typeof id !== "string") {
        return res.status(400).json({ message: "ID inválido!" });
    }
    const task = await prisma_1.prisma.todo.findFirst({
        where: { id, userId: req.user.id },
    });
    if (!task) {
        return res.status(404).json({ message: "Tarefa não encontrada!" });
    }
    await prisma_1.prisma.todo.delete({
        where: { id },
    });
    return res.status(200).json({ message: "Tarefa excluída!" });
}
//# sourceMappingURL=taskController.js.map