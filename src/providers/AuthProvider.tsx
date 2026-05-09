import React, { createContext, useContext, useState, ReactNode } from "react";
import { TokenStore } from "@/src/api/tokenStore";

interface User {
    name: string;
    email: string;
    birthDate: string;
    avatarUrl?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (data: { user: User; accessToken: string; authKey: string }) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    login: () => {},
    logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const login = (data: {
        user: User;
        accessToken: string;
        authKey: string;
    }) => {
        setUser(data.user);
        setToken(data.accessToken);

        TokenStore.set(data.accessToken);
    };

    const logout = () => {
        setUser(null);
        TokenStore.set(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);