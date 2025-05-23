export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'system' | 'user';
  read: boolean;
  createdAt: string;
  updatedAt: string;
}