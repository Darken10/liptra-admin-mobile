
import { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import {IUser} from "@/src/models/ResponseInterfaces";
import {BASE_URL, TOKEN_KEY} from "@/src/constants/Constants";

// Définition des types du contexte
type AuthContextType = {
    user: IUser | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

// Création du contexte avec une valeur par défaut
const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: true,
    login: async () => {},
    logout: async () => {},
});

// Hook personnalisé pour utiliser l'authentification
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);


    // Fonction pour récupérer le token stocké et les infos utilisateur
    const loadUser = async () => {
        setIsLoading(true);
        const token = await SecureStore.getItemAsync(TOKEN_KEY);

        if (token) {
            try {
                const response = await axios.get(BASE_URL+"/api/user", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data);
            } catch (error) {
                console.log('Erreur lors du chargement de l’utilisateur', error);
                await logout();
            }
        }

        setIsLoading(false);
    };

    // Fonction de connexion
    const login = async (email: string, password: string) => {
        setIsLoading(true);
        console.log("login", email, password);

        try {
            const response = await axios.post(BASE_URL+'/api/auth/login', { email, password });
            const token = response.data.token;

            console.log("Token : ", token);
            await SecureStore.setItemAsync(TOKEN_KEY, token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const userResponse = await axios.get(BASE_URL+"/api/user", {
                headers: { Authorization: `Bearer ${token}` },
            });

            setUser(userResponse.data);
        } catch (error) {
            console.log('Erreur de connexion', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // Fonction de déconnexion
    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        axios.defaults.headers.common['Authorization'] = '';
        setUser(null);
    };

    // Charger les informations de l'utilisateur au démarrage
    useEffect(() => {
        loadUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
