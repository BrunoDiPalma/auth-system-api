import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { createTodo, getTodos } from "../controllers/todoController";

const router = Router();

router.post("/", authMiddleware, createTodo);
router.get("/", authMiddleware, getTodos);

export default router;
