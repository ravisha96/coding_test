import express from "express";
import {
  getTask,
  updateTask,
  deleteTask,
  getAllTasks,
  createNewTasks,
} from "../controllers/tasks.js";

const router = express.Router();

router.route("/").get(getAllTasks).post(createNewTasks);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);


export default router