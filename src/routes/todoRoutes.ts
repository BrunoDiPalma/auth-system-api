import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { createTodo } from "../controllers/todoController";

const router = Router();

router.post("/", authMiddleware, createTodo);

export default router;
