import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api', // Adjust the base URL as needed
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getItems = async () => {
    try {
        const response = await apiClient.get('/items');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createItem = async (item) => {
    try {
        const response = await apiClient.post('/items', item);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateItem = async (id, item) => {
    try {
        const response = await apiClient.put(`/items/${id}`, item);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteItem = async (id) => {
    try {
        const response = await apiClient.delete(`/items/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};