import { Router } from 'express';

import adminController from '../controllers/admin.controller.js';
import verifyToken from '../middlewares/verifyJwt.mid.js';

const router = Router();

router.get('/all', adminController.getAllAdmins);
router.get('/all/:id', adminController.getAdminById);
router.get('/countAllUsers', adminController.countUsers);
router.get('/countAllProjects', adminController.countProjects);

export default router;