import axios from './axios';
import { Quote, CreateQuote } from '../types/quote';

// List all quotes
export const listQuotes = async (): Promise<Quote[]> => {
    const response = await axios.get('/v1/quotes');
    return response.data.data;
};

// Create a new quote
export const createQuote = async (quote: CreateQuote): Promise<Quote> => {
    const response = await axios.post('/v1/quotes', quote);
    return response.data;
};

// Get details of a specific quote
export const getQuoteDetails = async (quoteId: string): Promise<Quote> => {
    const response = await axios.get(`/v1/quotes/${quoteId}`);
    return response.data.data;
};

// Update an existing quote
export const updateQuote = async (quoteId: string, quoteData: Partial<Quote>): Promise<Quote> => {
    const response = await axios.put(`/v1/quotes/${quoteId}`, quoteData);
    return response.data.data;
};

// Approve a quote
export const approveQuote = async (quoteId: string): Promise<Quote> => {
    const response = await axios.post(`/v1/quotes/${quoteId}/approve`);
    return response.data.data;
};