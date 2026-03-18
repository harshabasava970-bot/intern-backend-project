const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const taskController = require("../controllers/taskController");

router.post("/", authMiddleware, taskController.createTask);

router.get("/mytasks", authMiddleware, taskController.getMyTasks);

router.get("/", authMiddleware, taskController.getTasks);

router.put("/:id", authMiddleware, taskController.updateTask);

router.delete("/:id", authMiddleware, adminMiddleware, taskController.deleteTask);

module.exports = router;