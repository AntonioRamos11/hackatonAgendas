import React from 'react';
import { Quote } from '../../types/quote';

interface QuoteListProps {
    data: Quote[];
}

const QuoteList: React.FC<QuoteListProps> = ({ data }) => {
    // Render your quotes using the `data` array
    return (
        <ul>
            {data.map(quote => (
                <li key={quote.id}>{quote.name}</li>
            ))}
        </ul>
    );
};

export default QuoteList;