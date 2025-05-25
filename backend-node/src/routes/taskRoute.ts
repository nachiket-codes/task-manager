import { addTask, getTasks } from "../controllers/taskController";
import express from 'express'
import protect from "../middleware/authMiddleware";

const router = express.Router()

router.use(protect)

router.post('/tasks', addTask);
router.get('/tasks', getTasks)

export default router