import express from 'express';
import taskController from '../controllers/task.controller.js';
import { verifyToken } from '../middlewares/verifyJwt.mid.js';

const router = express.Router();

router.post('/create', verifyToken, taskController.createTask);
router.get('/all', verifyToken, taskController.getTasks);
router.patch('/:id', verifyToken, taskController.updateTask);
router.delete('/:id', verifyToken, taskController.deleteTask);

export default router;