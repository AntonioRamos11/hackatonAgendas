import axios from 'axios';

const API_URL = '/v1/auth';

// Define types for the parameters
export interface RegisterData {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'staff' | 'client';
}

export const register = async (userData: RegisterData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

export const login = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
};

export const getCurrentUser = async (token: string) => {
    const response = await axios.get(`${API_URL}/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};