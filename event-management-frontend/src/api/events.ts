import axios from './axios';

const BASE_URL = '/events';

export interface Event {
  id: string;
  name: string;
  date: string;
  endDate: string;
  location: string;
  clientId: string;
  estimatedGuests: number;
  eventType: string;
  notes?: string;
}

export interface CreateEventData {
  name: string;
  date: string;
  endDate: string;
  location: string;
  clientId: string;
  estimatedGuests: number;
  eventType: string;
  notes?: string;
}

export interface EventTimelineItem {
  id: string;
  eventId: string;
  title: string;
  time: string;
  description: string;
  completed: boolean;
}

export const listEvents = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getEventDetail = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const createEvent = async (eventData: CreateEventData) => {
  const response = await axios.post(BASE_URL, eventData);
  return response.data;
};

export const updateEvent = async (id: string, eventData: Partial<CreateEventData>) => {
  const response = await axios.put(`${BASE_URL}/${id}`, eventData);
  return response.data;
};

export const deleteEvent = async (id: string) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};

export const getEventTimeline = async (eventId: string): Promise<EventTimelineItem[]> => {
  const response = await axios.get(`${BASE_URL}/${eventId}/timeline`);
  return response.data;
};