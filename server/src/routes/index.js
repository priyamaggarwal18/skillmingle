import express from 'express';
import authRoutes from './user.routes.js';
import projectRoutes from './project.routes.js';
import taskRoutes from './task.routes.js';
import resourceRoutes from './resource.routes.js';
import adminRoutes from './admin.routes.js';
import githubRoutes from './github.routes.js';
import verifyToken from '../middlewares/verifyJwt.mid.js';

const router = express.Router();

router.use('/api/auth', authRoutes);
router.use('/api/project', projectRoutes);
router.use('/api/task', taskRoutes);
router.use('/api/resource', resourceRoutes);
router.use('/api/admin', verifyToken, adminRoutes);

router.use('/api/github', verifyToken, githubRoutes);

export default router;