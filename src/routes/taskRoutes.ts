import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { createTasks, getTasks, updateTasks, deleteTask } from "../controllers/taskController";

const router = Router();

router.post("/", authMiddleware, createTasks);
router.get("/", authMiddleware, getTasks);
router.put("/:id", authMiddleware, updateTasks);
router.delete("/:id", authMiddleware, deleteTask);

export default router;