const port = 'http://localhost:4000/api';
import axios from 'axios';

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
        }
        console.log(response);
        return response.data;
    } catch (err) {
        console.log(err);
        return null;
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
        return response.data;
    } catch (err) {
        console.log(err);
        return null;
    }
};
