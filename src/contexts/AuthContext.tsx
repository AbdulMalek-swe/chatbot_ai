import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import api from '../api/client';

export interface User {
    id: string;
    email: string;
    full_name: string;
    role: string;
    profile_image?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, full_name: string) => Promise<void>;
    updateProfile: (data: { email?: string; password?: string; full_name?: string }) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMe = async () => {
            setUser({
                id: '1',
                email: 'admin@gmail.com',
                full_name: 'Admin',
                role: 'admin',
                profile_image: 'https://i.pravatar.cc/150?u=1'
            })
            // const token = localStorage.getItem('access_token');
            // if (token) {
            //     try {
            //         const response = await api.get('/auth/me');
            //         setUser(response.data);
            //     } catch (error) {
            //         console.error('Failed to fetch user', error);
            //         localStorage.removeItem('access_token');
            //         localStorage.removeItem('refresh_token');
            //     }
            // }
            setLoading(false);
        };

        fetchMe();
    }, []);

    const login = async (email: string) => {
        // const response = await api.post('/auth/login', { email, password });
        // const { access_token, refresh_token } = response.data;
        const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZW1vQGV4YW1wbGUuY29tIiwidHlwZSI6ImFjY2VzcyIsImV4cCI6MTc0NDY1OTQ5Nn0.0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
        const refresh_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZW1vQGV4YW1wbGUuY29tIiwidHlwZSI6InJlZnJlc2giLCJleHAiOjE3NDQ2NTk0OTZ9.0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
        // Some APIs might return user in the login response, 
        // others might need a separate /me call. 
        // Based on backend code, it returns TokenResponse which only has access/refresh/type/expires.

        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);

        // Fetch user info after login
        // const userResponse = await api.get('/auth/me');
        // setUser(userResponse.data);
        setUser({
            id: '1',
            email: email,
            full_name: 'Admin',
            role: 'admin',
            profile_image: 'https://i.pravatar.cc/150?u=1'
        })
    };

    const register = async (email: string, password: string, full_name: string) => {
        await api.post('/auth/register', { email, password, full_name });
        // After registration, we usually ask the user to login or log them in automatically.
        // Let's just finish the registration call here.
    };

    const updateProfile = async (data: { email?: string; password?: string; full_name?: string }) => {
        // const response = await api.patch('/auth/me', data);
        // setUser(response.data);
        setUser({
            id: '1',
            email: data.email || user?.email || '',
            full_name: data.full_name || user?.full_name || '',
            role: user?.role || 'admin',
            profile_image: user?.profile_image || 'https://i.pravatar.cc/150?u=1'
        })
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, updateProfile, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
