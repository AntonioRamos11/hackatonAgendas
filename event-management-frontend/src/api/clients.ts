import axios from './axios';
import { Client, CreateClient } from '../types/client';

const BASE_URL = '/clients';

export const listClients = async (): Promise<Client[]> => {
    const response = await axios.get(BASE_URL);
    return response.data.data;
};

export const createClient = async (client: CreateClient) => {
    const response = await axios.post(BASE_URL, client);
    return response.data;
};

export const getClientDetails = async (clientId: string): Promise<Client> => {
    const response = await axios.get(`${BASE_URL}/${clientId}`);
    return response.data.data;
};

export const updateClient = async (clientId: string, clientData: Partial<Client>): Promise<Client> => {
    const response = await axios.put(`${BASE_URL}/${clientId}`, clientData);
    return response.data.data;
};

export const deleteClient = async (clientId: string): Promise<string> => {
    const response = await axios.delete(`${BASE_URL}/${clientId}`);
    return response.data.message;
};