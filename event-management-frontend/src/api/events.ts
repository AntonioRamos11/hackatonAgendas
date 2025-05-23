import axios from './axios'; // use your configured instance

const BASE_URL = '/events'; // baseURL is already set in axios instance

// Define types for event data
export interface EventData {
    name: string;
    date: string;
    endDate?: string;
    location: string;
    clientId: string;
    estimatedGuests?: number;
    eventType?: string;
    notes?: string;
    status?: string;
    // Add other fields as needed
}

export const listEvents = async (page = 1, limit = 10) => {
    const response = await axios.get(`${BASE_URL}?page=${page}&limit=${limit}`);
    return response.data;
};

export const createEvent = async (eventData: EventData) => {
    const response = await axios.post(BASE_URL, eventData);
    return response.data;
};

export const getEventDetails = async (eventId: string) => {
    const response = await axios.get(`${BASE_URL}/${eventId}`);
    return response.data;
};

export const updateEvent = async (eventId: string, eventData: Partial<EventData>) => {
    const response = await axios.put(`${BASE_URL}/${eventId}`, eventData);
    return response.data;
};

export const deleteEvent = async (eventId: string) => {
    const response = await axios.delete(`${BASE_URL}/${eventId}`);
    return response.data;
};

export const getEventTimeline = async (eventId: string) => {
    const response = await axios.get(`${BASE_URL}/${eventId}/timeline`);
    return response.data;
};

export const updateEventStatus = async (eventId: string, status: string) => {
    const response = await axios.post(`${BASE_URL}/${eventId}/status`, { status });
    return response.data;
};