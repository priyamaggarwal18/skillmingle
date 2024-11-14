import { Router } from 'express';

import adminController from '../controllers/admin.controller.js';
import { verifyToken } from '../middlewares/verifyJwt.mid.js';

const router = Router();

router.get('/all', verifyToken, adminController.getAllAdmins);
router.get('/all/:id', verifyToken, adminController.getAdminById);
router.get('/countAllUsers', verifyToken, adminController.countUsers);
router.get('/countAllProjects', verifyToken, adminController.countProjects);

export default router;