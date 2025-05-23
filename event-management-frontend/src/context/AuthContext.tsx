import React, { createContext, useContext, useState, useEffect } from 'react';
import { login, register, getCurrentUser } from '../api/auth';

interface AuthContextType {
  user: any;
  loginUser: (email: string, password: string) => Promise<void>;
  registerUser: (name: string, email: string, password: string, role: 'admin' | 'staff' | 'client') => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      const currentUser = await getCurrentUser(token);
      setUser(currentUser);
    };

    fetchUser();
  }, []);

  const loginUser = async (email: string, password: string) => {
    const response = await login(email, password);
    setUser(response.data);
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string,
    role: 'admin' | 'staff' | 'client'
  ) => {
    const response = await register({ name, email, password, role });
    setUser(response.data);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, registerUser, logout }}>
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