import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000,
    /* headers: { 'x-auth-token': token } */
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers["x-auth-token"] = token;
        }
        return config;
    },
    (error) => {
        console.log('interceptor error')
        return Promise.reject(error);
    }
)