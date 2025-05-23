export interface QuoteItem {
  inventoryId: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Quote {
  id: string;
  clientId: string;
  eventId: string;
  name: string;
  notes: string;
  items: {
    inventoryId: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  createdAt: string;
  updatedAt: string;
  status: string;
}

export type CreateQuote = Omit<Quote, 'id' | 'createdAt' | 'updatedAt' | 'status'>;