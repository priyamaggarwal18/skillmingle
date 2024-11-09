import express from 'express';
import authRoutes from './user.routes.js';
const router = express.Router();

router.use('/api/auth',authRoutes);

export default router;