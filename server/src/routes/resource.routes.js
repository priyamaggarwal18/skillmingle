import express from 'express';
import resourceController from '../controllers/resource.controller.js';
import { verifyToken } from '../middlewares/verifyJwt.mid.js';

const router = express.Router();

router.post('/create', verifyToken, resourceController.createResource);
router.get('/all', verifyToken, resourceController.getResources);
router.patch('/:id', verifyToken, resourceController.updateResource);
router.delete('/:id', verifyToken, resourceController.deleteResource);

export default router;