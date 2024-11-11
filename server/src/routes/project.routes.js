import express from "express";
import projectContoller from "../controllers/project.controller.js";

const router = express.Router();


router.post('/create', projectContoller.createProj);
router
    .route('/:id')
    .get(projectContoller.getProjById)
    .patch(projectContoller.updateProj)
    .delete(projectContoller.deleteProj);

router.route("")

export default router;