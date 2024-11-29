import { Router } from 'express';
import githubController from '../controllers/github.controller.js';

const router = Router();

// get Routes
router.route('/user')
    .get(githubController.routeGithubUser);
router
    .route('/user/repos')
    .get(githubController.getAllUserPublicRepos);

router
    .route('/user/repos/:repoName')
    .get(githubController.getGithubRepo)
    .post(githubController.createGithubRepo) // [Test this route
    .patch(githubController.updateGithubRepo) // [Test this route]
    .delete(githubController.deleteGithubRepo); // [Test this route]
router.route('/user/repos/:repoName/commits')
    .get(githubController.getGithubCommits)
    .post(githubController.addGithubCommit) // [Test this route]'
    .patch(githubController.updateGithubCommit) // [Test this route]
    .delete(githubController.deleteGithubCommit); // [Test this route]

router
    .route('/user/repos/:repoName/contributors')
    .get(githubController.getGithubContributors)
    .post(githubController.addGithubContributor) // [Test this route
    .patch(githubController.updateGithubContributor) // [Test this route]
    .delete(githubController.deleteGithubContributor); // [Test this route]
router.route('/user/repos/:repoName/pullrequests')
    .get(githubController.getGithubPullRequests)
    .post(githubController.createGithubPullRequest) // [Test this route]
    .patch(githubController.updateGithubPullRequest) // [Test this route]
    .delete(githubController.deleteGithubPullRequest); // [Test this route]

// Post Routes
router
    .route('/user/repos/:repoName/issues')
    .get(githubController.getGithubIssues)
    .post(githubController.createGithubIssue) // [Test this route]
    .patch(githubController.updateGithubIssue) // [Test this route]
    .delete(githubController.deleteGithubIssue) // [Test this route]


export default router;