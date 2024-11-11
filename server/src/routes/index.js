import express from 'express';
import authRoutes from './user.routes.js';
import projectRoutes from './project.routes.js';
import { verifyToken } from '../middlewares/verifyJwt.mid.js';

const router = express.Router();

router.use('/api/auth', authRoutes);
router.use('/api/project', verifyToken, projectRoutes);

export default router;