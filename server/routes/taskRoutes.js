import express from "express";
import TaskController from "../controllers/taskController.js";

const router= express.Router();

router.post("/tasks", TaskController.createTask);
router.get("/getalltasks", TaskController.getAllTasks);

router.get("/task/:id", TaskController.getTask);
router.put("/task/:id", TaskController.updateTask);
router.delete("/task/:id", TaskController.deleteTask);

router.post("/bulktasks", TaskController.bulkAddTasks);
router.delete("/bulktasks",TaskController.bulkDelete);

export default router;