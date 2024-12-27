import axios from 'axios';
import { logoutUser, refreshToken } from './authService/authService.jsx';

const Axios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// intercept any request from user
Axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

// intercept any response from server
Axios.interceptors.response.use((res) => res, 
    async (err) => {
        const originalConfig = err.config;
        if((err.response?.status === 401 || err.response?.status === 403) && !originalConfig._retry) {
            originalConfig._retry = true;
            try {
                const newToken = await refreshToken();
                localStorage.setItem('token', newToken.data.token);
                originalConfig.headers['Authorization'] = `Bearer ${newToken.data.token}`;
                return axiosInstance(originalConfig);
            } catch(err) {
                logoutUser();
                return Promise.reject(err);
            }
        }
        return Promise.reject(err);
    }
);

export default Axios;