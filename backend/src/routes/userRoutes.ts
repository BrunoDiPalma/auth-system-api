import { Router } from "express";
import {
  register,
  login,
  getMe,
  getUsers,
  getUserbyId,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);
router.get("/", authMiddleware, getUsers);
router.get("/:id", authMiddleware, getUserbyId);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

export default router;
