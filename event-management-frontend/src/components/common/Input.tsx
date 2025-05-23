import React from 'react';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
};

const Input: React.FC<InputProps> = ({ label, ...props }) => (
    <label>
        {label && <span>{label}</span>}
        <input {...props} />
    </label>
);

export default Input;