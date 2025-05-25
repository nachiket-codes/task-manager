import { addTask } from "../controllers/taskController";
import express from 'express'
import protect from "../middleware/authMiddleware";

const router = express.Router()

router.use(protect)

router.post('/tasks', addTask);

export default router;