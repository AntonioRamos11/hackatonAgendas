export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  notes?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  role: 'client';
  status?: 'active' | 'inactive' | 'pending';
  referredBy?: string;
  contactPreference?: 'email' | 'phone';
  password?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClientDetails extends Client {
  events?: ClientEvent[];
  invoices?: ClientInvoice[];
  quotes?: ClientQuote[];
}

export interface ClientEvent {
  id: string;
  name: string;
  date: string;
  location: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}

export interface ClientInvoice {
  id: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'unpaid' | 'overdue' | 'cancelled';
}

export interface ClientQuote {
  id: string;
  amount: number;
  validUntil: string;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
}

export type CreateClient = Omit<Client, 'id' | 'createdAt' | 'updatedAt' | 'role'>;

export type UpdateClient = Partial<Omit<Client, 'id' | 'createdAt' | 'updatedAt' | 'role' | 'password'>>;
