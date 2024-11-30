import axios from 'axios';

const port = (import.meta.env?.API_URL || process?.env?.API_URL || 'http://localhost:4000') + '/api';
export const login = async (email, password) => {
    //   console.log(email,password);
    try {
        const response = await axios.post(`${port}/auth/login`, {
                email,
                password,
            }, {
                withCredentials: true,
            }
        );
        if (!response) {
            console.log('No response');
            return {
                success: false,
                message: 'No response',
            };
        }

        return response.data;
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: err.message || 'Internal Error occurred',
        };
    }
};

export const register = async (fullName, email, password, role) => {
    try {
        const response = await axios.post(`${port}/auth/register`, {
                fullName,
                email,
                password,
                role,
            }, {
                withCredentials: true,
            }
        );
        if (!response) {
            console.log('No response');
            return {
                success: false,
                message: 'No response',
            };
        }
        return response.data;
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: err.message || 'Internal Error occurred',
        };
    }
};

export const logout = async () => {
    try {
        const response = await axios.get(`${port}/auth/logout`, {
            withCredentials: true,
        }
        );
        if (!response) {
            console.log('No response');
            return {
                success: false,
                message: 'No response',
            };
        }
        return response.data;
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: err.message || 'Internal Error occurred',
        };
    }
};

export const getCurrUser = async () => {
    try {
        const response = await axios.get(`${port}/auth/profile`, {
            withCredentials: true,
        });
        if (!response) {
            console.log('No response');
            return {
                success: false,
                message: 'No response',
            };
        }
        // console.log(response.data.data);
        return response.data;
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: err.message || 'Internal Error occurred',
        };
    }
};