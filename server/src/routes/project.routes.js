import express from "express";
import projectController from "../controllers/project.controller.js";

const router = express.Router();


router.post('/create', projectController.createProj);
router
    .route('/:id')
    .get(projectController.getProjById)
    .patch(projectController.updateProj)
    .delete(projectController.deleteProj);

router.route("")

export default router;