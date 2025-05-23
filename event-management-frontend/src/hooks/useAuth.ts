import { useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister } from '../api/auth';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiLogin(email, password);
            setUser(response.data);
            localStorage.setItem('token', response.data.token);
        } catch (err) {
            if (
                err &&
                typeof err === 'object' &&
                !Array.isArray(err) &&
                err !== null &&
                'response' in err &&
                err.response &&
                typeof err.response === 'object' &&
                err.response !== null &&
                'data' in err.response &&
                err.response.data &&
                typeof err.response.data === 'object' &&
                err.response.data !== null &&
                'message' in err.response.data
            ) {
                setError((err as any).response.data.message);
            } else {
                setError('An unknown error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    const register = async (
        name: string,
        email: string,
        password: string,
        role: 'admin' | 'staff' | 'client'
    ) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiRegister({ name, email, password, role });
            setUser(response.data);
            localStorage.setItem('token', response.data.token);
        } catch (err) {
            if (
                err &&
                typeof err === 'object' &&
                !Array.isArray(err) &&
                err !== null &&
                'response' in err &&
                err.response &&
                typeof err.response === 'object' &&
                err.response !== null &&
                'data' in err.response &&
                err.response.data &&
                typeof err.response.data === 'object' &&
                err.response.data !== null &&
                'message' in err.response.data
            ) {
                setError((err as any).response.data.message);
            } else {
                setError('An unknown error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Optionally, you can verify the token and fetch user data
            // setUser(decodedUserData);
        }
        setLoading(false);
    }, []);

    return { user, loading, error, login, register, logout };
};

export default useAuth;