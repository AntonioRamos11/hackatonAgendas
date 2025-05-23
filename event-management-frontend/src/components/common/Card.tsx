import React from 'react';

interface CardProps {
    title: string;
    count?: number;
    children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, count, children }) => (
    <div className="card">
        <h3>{title}</h3>
        {typeof count === 'number' && <div className="card-count">{count}</div>}
        {children}
    </div>
);

export default Card;