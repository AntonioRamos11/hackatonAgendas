import axios from './axios';
import { Invoice, CreateInvoice } from '../types/invoice';

// List Invoices
export const listInvoices = async () => {
    const response = await axios.get('/v1/invoices');
    return response.data;
};

// Create Invoice
export const createInvoice = async (invoice: CreateInvoice) => {
    const response = await axios.post('/v1/invoices', invoice);
    return response.data;
};

// Get Invoice Details
export const getInvoiceDetails = async (invoiceId: string) => {
    const response = await axios.get(`/v1/invoices/${invoiceId}`);
    return response.data;
};

// Update Invoice
export const updateInvoice = async (invoiceId: string, invoiceData: Partial<Invoice>) => {
    const response = await axios.put(`/v1/invoices/${invoiceId}`, invoiceData);
    return response.data;
};

// Record Payment
export const recordPayment = async (invoiceId: string, paymentData: { amount: number; method: string; reference: string; notes?: string }) => {
    const response = await axios.post(`/v1/invoices/${invoiceId}/payment`, paymentData);
    return response.data;
};