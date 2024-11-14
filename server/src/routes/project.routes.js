import express from "express";
import projectController from "../controllers/project.controller.js";
import { verifyToken } from "../middlewares/verifyJwt.mid.js";

const router = express.Router();


router.post('/create', projectController.createProj);
router
    .route('/:id')
    .get(verifyToken, projectController.getProjById)
    .patch(verifyToken, projectController.updateProj)
    .delete(verifyToken, projectController.deleteProj);

// router.route("")

export default router;