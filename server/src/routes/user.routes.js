// routes/user.routes.js
import express from 'express';
import UserController from '../controllers/user.controller.js';
import  {verifyToken} from '../middlewares/verifyJwt.mid.js';

const router = express.Router();

// Auth routes
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', verifyToken, UserController.logout);

// // Profile routes
router.put('/profile', verifyToken, UserController.updateProfile);
router.put('/status', verifyToken, UserController.updateStatus);
// router.get('/badges', verifyToken, UserController.getBadges);
// router.post('/badges/:userId', verifyToken, UserController.awardBadge);

export default router;