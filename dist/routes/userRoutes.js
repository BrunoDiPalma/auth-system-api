"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post("/register", userController_1.register);
router.post("/login", userController_1.login);
router.get("/me", authMiddleware_1.authMiddleware, userController_1.getMe);
router.get("/", authMiddleware_1.authMiddleware, userController_1.getUsers);
router.get("/:id", authMiddleware_1.authMiddleware, userController_1.getUserbyId);
router.put("/:id", authMiddleware_1.authMiddleware, userController_1.updateUser);
router.delete("/:id", authMiddleware_1.authMiddleware, userController_1.deleteUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map