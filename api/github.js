import axios from "axios";

const githubUrl = (import.meta?.env?.API_URL || process?.env?.API_URL || 'http://localhost:4000') + '/api';

export const getGithubRepo = async (url) => {
    try {
        const username = url.split('github.com/')[1].split('/')[0]?.trim();
        const repoName = url.split('github.com/')[1].split('/')[1]?.trim();

        const response = await axios.get(`${githubUrl}/github/user/${username}/repos/${repoName}`, {
            withCredentials: true
        })
        if (!response) {
            console.error('No Resposne Found...')
        }

        // console.log(response.data);
        return response.data;
    } catch (err) {
        console.error(err);
        return {
            success: false,
            message: 'Internal Client Error.'
        }
    }
}

export const getGithubUser = async (username) => {
    try {
        const response = await axios.get(`${githubUrl}/github/user/${username}`, {
            withCredentials: true
        })
        if (!response) {
            console.error('No Resposne Found...')
        }

        // console.log(response.data);
        return response.data;
    } catch (err) {
        console.error(err);
        return {
            success: false,
            message: 'Internal Client Error.'
        }
    }
};