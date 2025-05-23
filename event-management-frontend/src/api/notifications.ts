import axios from './axios';
import { Notification } from '../types/notification';

const BASE_URL = '/v1/notifications';

export const listNotifications = async (): Promise<Notification[]> => {
    const response = await axios.get(BASE_URL);
    return response.data.data;
};

export const registerDevice = async (deviceToken: string, platform: string): Promise<any> => {
    const response = await axios.post(`${BASE_URL}/register-device`, { deviceToken, platform });
    return response.data.data;
};

export const createNotification = async (userId: string, title: string, message: string, type: string): Promise<any> => {
    const response = await axios.post(BASE_URL, { userId, title, message, type });
    return response.data.data;
};

export const markNotificationAsRead = async (notificationId: string): Promise<any> => {
    const response = await axios.put(`${BASE_URL}/${notificationId}/read`, {});
    return response.data.data;
};

export const deleteNotification = async (notificationId: string): Promise<any> => {
    const response = await axios.delete(`${BASE_URL}/${notificationId}`);
    return response.data.message;
};