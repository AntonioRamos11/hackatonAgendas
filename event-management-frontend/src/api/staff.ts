import axios from './axios';
const BASE_URL = '/staff';
// Agrega esto antes de hacer la petición
console.log("[DEBUG] Token:", localStorage.getItem('token'));

// Si el token no existe, redirige al login
if (!localStorage.getItem('token')) {
  window.location.href = '/login';
  throw new Error('Usuario no autenticado');
}
export interface StaffData {
    name: string;
    email: string;
    phone: string;
    role: 'admin' | 'staff';
    position?: string;
    notes?: string;
}

const getAuthHeader = () => {
    // For development only - use a hardcoded token if none exists
    const token = localStorage.getItem('token') || 'your-development-token-here';
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

export const listStaff = async () => {
    const response = await axios.get(BASE_URL, getAuthHeader()); // Added header
    return response.data;
};

export const createStaff = async (staffData: StaffData) => {
    const response = await axios.post(BASE_URL, staffData, getAuthHeader()); // Added header
    return response.data;
};

export const getStaffDetails = async (staffId: string) => {
    const response = await axios.get(`${BASE_URL}/${staffId}`, getAuthHeader()); // Added header
    return response.data;
};

export const updateStaff = async (staffId: string, staffData: Partial<StaffData>) => {
    const response = await axios.put(`${BASE_URL}/${staffId}`, staffData, getAuthHeader()); // Added header
    return response.data;
};

export const deleteStaff = async (staffId: string) => {
    const response = await axios.delete(`${BASE_URL}/${staffId}`, getAuthHeader()); // Added header
    return response.data;
};

export const getStaffSchedule = async (staffId: string) => {
    const response = await axios.get(`${BASE_URL}/${staffId}/schedule`, getAuthHeader()); // Added header
    return response.data;
};