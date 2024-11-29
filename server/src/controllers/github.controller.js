import axios from 'axios';
import Project from '../models/project.model.js';
import { error, log } from 'console';
import User from '../models/user.model.js';

const GITHUB_URL = 'https://api.github.com';

const getGithubUser = async (req, res) => {
    try {
        const username = req.params.username;
        const response = await axios.get(
            `${GITHUB_URL}/users/${username}`
        );
        console.log(response.data);
        if (!username || !response.data) {
            return res
                .status(400)
                .json({ message: 'Invalid username' });
        }
        return res.json(response.data);
    } catch (error) {
        log(error);
        return res.status(500).json({ error: error.message });
    }
};

const getAllUserPublicRepos = async (req, res) => {
    try {
        const { username } = req.params;
        const response = await axios.get(
            `${GITHUB_URL}/users/${username}/repos`
        );
        return res.json(response.data);
    } catch (err) {
        error(err);
        return res.status(500).json({ error: err.message });
    }
};

const getGithubRepo = async (req, res) => {
    // https://api.github.com/repos/priyamaggarwal18/skillmingle
    https: try {
        const { username, repoName } = req.params;
        const response = await axios.get(
            `${GITHUB_URL}/repos/${username}/${repoName}`
        );
        return res.json(response.data);
    } catch (error) {
        log(error);
        return res.status(500).json({ error: error.message });
    }
};

const getGithubCommits = async (req, res) => {
    try {
        const { username, repoName } = req.params;

        const response = await axios.get(
            `${GITHUB_URL}/repos/${username}/${repoName}/commits`
        );
        return res.json(response.data);
    } catch (error) {
        log(error);
        return res.status(500).json({ error: error.message });
    }
};

const getGithubPullRequests = async (req, res) => {
    try {
        const projId = req.params.id;
        const proj = await Project.findById(projId);
        if (!proj) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const githubLink = proj.link?.toString().split('github.com/')[1];
        if (!githubLink) {
            return res.status(400).json({ message: 'Invalid GitHub link' });
        }
        const github = githubLink.split('/');
        const GITHUB_USERNAME = github[0];
        const GITHUB_REPO = github[1];

        const response = await axios.get(
            `${GITHUB_URL}/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/pulls`
        );
        return res.json(response.data);
    } catch (error) {
        log(error);
        return res.status(500).json({ error: error.message });
    }
};

const getGithubContributors = async (req, res) => {
    try {
        const { username, repoName } = req.params;

        const response = await axios.get(`${GITHUB_URL}/repos/${username}/${repoName}/contributors`);
        if (!response.data) {
            return res.status(404).json({ message: 'Contributors not found' });
        }

        return res.json(response.data);
    } catch (err) {
        error(err);
        return res.status(500).json({ error: err.message });
    }
};

const getGithubIssues = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const user = await User.findById(req.user.id);
        const { username, repoName } = req.params;

        const response = await axios.get(`${GITHUB_URL}/repos/${username}/${repoName}/issues`);
        if (!response.data) {
            return res.status(404).json({ message: 'Issues not found' });
        }

        return res.json(response.data);
    } catch (err) {
        error(err);
        return res.status(500).json({ error: err.message });
    }
};


const createGithubIssue = async (req, res) => {
    try {
        const { username, repoName } = req.params.repoName;
        const { title, body } = req.body;

        const response = await axios.post(`${GITHUB_URL}/repos/${username}/${repoName}/issues`, {
            title,
            body,
        });

        return res.json(response.data);
    } catch (err) {
        error(err);
        return res.status(500).json({ error: err.message });
    }
};



export default {
    // geting info
    getGithubUser,
    getAllUserPublicRepos,
    getGithubRepo,
    getGithubIssues,
    getGithubCommits,
    getGithubPullRequests,
    getGithubContributors,
    // creating things
    createGithubIssue,
};