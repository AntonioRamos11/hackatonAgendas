import React, { useEffect, useState } from 'react';
import { listQuotes } from '../../api/quotes';
import QuoteList from '../../components/quotes/QuoteList';
import { Quote } from '../../types/quote';

const Quotes: React.FC = () => {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                const response = await listQuotes();
                setQuotes(response);
            } catch (err) {
                setError('Failed to fetch quotes');
            } finally {
                setLoading(false);
            }
        };

        fetchQuotes();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Quotes</h1>
            <QuoteList data={quotes} />
        </div>
    );
};

export default Quotes;