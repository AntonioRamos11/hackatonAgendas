export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff' | 'client';
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'staff' | 'client';
}

export interface LoginRequest {
  email: string;
  password: string;
}