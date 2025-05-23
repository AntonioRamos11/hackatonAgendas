interface InvoiceItem {
  inventoryId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  clientId: string;
  quoteId: string;
  eventId: string;
  amount: number;
  dueDate: string;
  notes?: string;
  // ...other fields
}

export type CreateInvoice = Omit<Invoice, 'id' | 'quoteId'>;