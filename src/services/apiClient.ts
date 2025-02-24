import axios from 'axios';
import {BASE_URL} from "@/src/constants/Constants";
import {useAuth} from "@/src/context/AuthContext";

const api = axios.create({
    baseURL: BASE_URL+'/api',
});

api.interceptors.request.use(async (config) => {
    const { userToken } = useAuth();
    if (userToken) {
        config.headers.Authorization = `Bearer ${userToken}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            const { logout } = useAuth();
            logout();
        }
        return Promise.reject(error);
    }
);

export default api;
