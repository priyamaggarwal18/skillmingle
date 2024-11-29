import express from "express";
import projectController from "../controllers/project.controller.js";
import gitController from "../controllers/github.controller.js";
import verifyToken from "../middlewares/verifyJwt.mid.js";

const router = express.Router();


router.post('/create', verifyToken, projectController.createProj);
router
    .route('/:id')
    .get(verifyToken, projectController.getProjById)
    .patch(verifyToken, projectController.updateProj)
    .delete(verifyToken, projectController.deleteProj);

router
    .route('/github/:id')
    .get(verifyToken, gitController.getGithubCommits);

export default router;