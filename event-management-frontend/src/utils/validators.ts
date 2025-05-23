export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
    return password.length >= 6;
};

export const validateRequired = (value: string): boolean => {
    return value.trim() !== '';
};

export const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/; // Format: 555-123-4567
    return phoneRegex.test(phone);
};