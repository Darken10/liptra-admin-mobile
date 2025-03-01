import axios from 'axios';
import {BASE_URL, TOKEN_KEY} from "@/src/constants/Constants";
import {useAuth} from "@/src/context/AuthContext";
import {getItem} from "expo-secure-store";

const api = axios.create({
    baseURL: BASE_URL+'/api',
});

api.interceptors.request.use(async (config) => {
    const userToken  = getItem(TOKEN_KEY);
    if (userToken) {
        config.headers.Authorization = `Bearer ${userToken}`;
        config.headers.setContentType("application/json");
    }
    console.log(config.baseURL)
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
