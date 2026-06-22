"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const taskController_1 = require("../controllers/taskController");
const router = (0, express_1.Router)();
router.post("/", authMiddleware_1.authMiddleware, taskController_1.createTasks);
router.get("/", authMiddleware_1.authMiddleware, taskController_1.getTasks);
router.put("/:id", authMiddleware_1.authMiddleware, taskController_1.updateTasks);
router.delete("/:id", authMiddleware_1.authMiddleware, taskController_1.deleteTask);
exports.default = router;
//# sourceMappingURL=taskRoutes.js.map