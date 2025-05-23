import axios from 'axios';

const BASE_URL = '/v1/inventory';

// Define types for inventory items if not already defined
export interface InventoryItem {
    id?: string;
    name: string;
    category: string;
    quantity: number;
    unitCost: number | string;
    description?: string;
    // Add other fields as needed
}

export const listInventory = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

export const createInventoryItem = async (item: InventoryItem) => {
    const response = await axios.post(BASE_URL, item);
    return response.data;
};

export const getInventoryItem = async (inventoryId: string) => {
    const response = await axios.get(`${BASE_URL}/${inventoryId}`);
    return response.data;
};

export const updateInventoryItem = async (inventoryId: string, item: Partial<InventoryItem>) => {
    const response = await axios.put(`${BASE_URL}/${inventoryId}`, item);
    return response.data;
};

export const updateInventoryQuantity = async (id: string, quantity: number) => {
    const response = await axios.post('/v1/inventory/update', { id, quantity });
    return response.data;
};

export const getInventoryCategories = async () => {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
};

export const checkInventoryAvailability = async (startDate: string, endDate: string) => {
    const response = await axios.get(`${BASE_URL}/availability`, {
        params: { start_date: startDate, end_date: endDate }
    });
    return response.data;
};

export const deleteInventoryItem = async (inventoryId: string) => {
    const response = await axios.delete(`${BASE_URL}/${inventoryId}`);
    return response.data;
};