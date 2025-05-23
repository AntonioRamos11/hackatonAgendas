export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  notes?: string;
  password?: string;
  createdAt: string;
  updatedAt: string;
}



export type CreateClient = Omit<Client, 'id' | 'createdAt' | 'updatedAt'>;// Add this type for client creation:
// Add this type for client creation:
