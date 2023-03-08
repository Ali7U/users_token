import express from "express";
import { findTasks, addTask, updateTask, deleteTask } from "../controller/tasks.controller";

const router = express.Router();

router.post("/", addTask);
router.get("/", findTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
