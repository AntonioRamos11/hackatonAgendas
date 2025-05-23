import axios from 'axios';

const BASE_URL = '/v1/staff';

// Define a type for staff data
export interface StaffData {
    name: string;
    email: string;
    phone: string;
    role: 'admin' | 'staff';
    position?: string;
    notes?: string;
    // Add other fields as needed
}

export const listStaff = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

export const createStaff = async (staffData: StaffData) => {
    const response = await axios.post(BASE_URL, staffData);
    return response.data;
};

export const getStaffDetails = async (staffId: string) => {
    const response = await axios.get(`${BASE_URL}/${staffId}`);
    return response.data;
};

export const updateStaff = async (staffId: string, staffData: Partial<StaffData>) => {
    const response = await axios.put(`${BASE_URL}/${staffId}`, staffData);
    return response.data;
};

export const deleteStaff = async (staffId: string) => {
    const response = await axios.delete(`${BASE_URL}/${staffId}`);
    return response.data;
};

export const getStaffSchedule = async (staffId: string) => {
    const response = await axios.get(`${BASE_URL}/${staffId}/schedule`);
    return response.data;
};

