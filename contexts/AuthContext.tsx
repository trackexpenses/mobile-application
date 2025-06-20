import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    deleteUser,
    getUserData,
    saveUser,
} from '@/utils/AsyncStorageHelper';
import {
    addTokenToSecureStore,
    AuthTokens,
    deleteUserTokens,
    getTokenFromSecureStore,
} from '@/utils/SecureStoreHelper';

export interface IUser {
    id: number;
    name: string;
    email: string;
}

type AuthContextType = {
    user: IUser | null;
    isLoggedIn: boolean;
    login: (userData: IUser, token: string) => Promise<void>;
    logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const token = await getTokenFromSecureStore(AuthTokens.ACCESS_TOKEN);
                if (token) {
                    const storedUser = await getUserData();
                    if (storedUser) {
                        setUser(storedUser);
                        setIsLoggedIn(true);
                    }
                }
            } catch (error) {
                console.error('Failed to load user data:', error);
            }
        };
        loadUser();
    }, []);

    const login = async (userData: IUser, token: string) => {
        await addTokenToSecureStore(AuthTokens.ACCESS_TOKEN, token);
        await saveUser(userData);
        setUser(userData);
        setIsLoggedIn(true);
    };

    const logout = async () => {
        setIsLoggedIn(false);
        await deleteUser();
        await deleteUserTokens();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};



