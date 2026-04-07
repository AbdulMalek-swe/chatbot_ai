import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
});

// Request interceptor for adding the bearer token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error is 401 and we haven't retried yet
        // if (error.response?.status === 401 && !originalRequest._retry) {
        //     originalRequest._retry = true;

        //     const refreshToken = localStorage.getItem('refresh_token');
        //     if (refreshToken) {
        //         try {
        //             const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/auth/refresh`, {
        //                 refresh_token: refreshToken,
        //             });

        //             const { access_token, refresh_token: new_refresh_token } = response.data;

        //             localStorage.setItem('access_token', access_token);
        //             if (new_refresh_token) {
        //                 localStorage.setItem('refresh_token', new_refresh_token);
        //             }

        //             api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        //             return api(originalRequest);
        //         } catch (refreshError) {
        //             // If refresh token fails, logout the user
        //             // localStorage.removeItem('access_token');
        //             // localStorage.removeItem('refresh_token');
        //             // window.location.href = '/login';
        //             return Promise.reject(refreshError);
        //         }
        //     }
        // }

        return Promise.reject(error);
    }
);

export default api;
