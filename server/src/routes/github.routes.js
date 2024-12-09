import { Router } from 'express';
import githubController from '../controllers/github.controller.js';

const router = Router();

// get Routes
router.route('/user/:username')
    .get(githubController.getGithubUser);
router
    .route('/user/:username/repos')
    .get(githubController.getAllUserPublicRepos);

router
    .route('/user/:username/repos/:repoName')
    .get(githubController.getGithubRepo)
    // .post(githubController.createGithubRepo)
    // .patch(githubController.updateGithubRepo)
    // .delete(githubController.deleteGithubRepo);
router.route('/user/:username/repos/:repoName/commits')
    .get(githubController.getGithubCommits)
    // .post(githubController.addGithubCommit)'
    // .patch(githubController.updateGithubCommit)
    // .delete(githubController.deleteGithubCommit);

router
    .route('/user/:username/repos/:repoName/contributors')
    .get(githubController.getGithubContributors)
    // .post(githubController.addGithubContributor)
    // .patch(githubController.updateGithubContributor)
    // .delete(githubController.deleteGithubContributor);
router.route('/user/:username/repos/:repoName/pullrequests')
    .get(githubController.getGithubPullRequests)
    // .post(githubController.createGithubPullRequest)
    // .patch(githubController.updateGithubPullRequest)
    // .delete(githubController.deleteGithubPullRequest);

// Post Routes
router
    .route('/user/repos/:repoName/issues')
    .get(githubController.getGithubIssues)
    // .post(githubController.createGithubIssue)
    // .patch(githubController.updateGithubIssue)
    // .delete(githubController.deleteGithubIssue)


export default router;