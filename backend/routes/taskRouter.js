const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");

router.post("/", taskController.addTask);
router.get("/", taskController.getAllTasks);
router.get("/:id", taskController.getTaskById);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTaskById);

module.exports = router;
