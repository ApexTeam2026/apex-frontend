import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { TokenStore } from "@/src/api/tokenStore";
import { useSurveyStore } from "@/src/store/surveyStore";
import { AuthService } from "@/src/api/services/auth-services";

interface User {
    id: number;
    name: string;
    email: string;
    birthDate: string;
    avatarUrl?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (data: {
        user: User;
        accessToken: string;
        authKey: string;
    }) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    login: async () => {},
    logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const login = async (data: {
        user: User;
        accessToken: string;
        authKey: string;
    }) => {
        useSurveyStore.getState().reset();

        setUser(data.user);
        setToken(data.accessToken);

        await TokenStore.set(data.accessToken);
    };

    const logout = async () => {
        setUser(null);
        setToken(null);

        await TokenStore.set(null);

        useSurveyStore.getState().reset();
    };

    useEffect(() => {
    const restoreAuth = async () => {
        const token = await TokenStore.load();

        if (!token) return;

        try {
            const user = await AuthService.getMe();

            setToken(token);
            setUser({
                id: user.id,
                name: user.name,
                email: user.email,
                birthDate: user.birthdayDate,
                avatarUrl: user.avatarUrl,
            });
        } catch {
            await TokenStore.set(null);
        } finally {
            setIsLoading(false);
        }

    };

        restoreAuth();
    }, []);

    // if (isLoading) {
    //     return null;
    // }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);