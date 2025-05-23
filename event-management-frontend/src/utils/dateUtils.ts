import { format, parseISO } from 'date-fns';

export const formatDate = (dateString: string, dateFormat: string = 'MMMM dd, yyyy'): string => {
    return format(parseISO(dateString), dateFormat);
};

export const isDateInRange = (dateString: string, startDate: string, endDate: string): boolean => {
    const date = parseISO(dateString);
    return date >= parseISO(startDate) && date <= parseISO(endDate);
};

export const getCurrentDate = (): string => {
    return new Date().toISOString().split('T')[0];
};