import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuoteDetails } from '../../api/quotes';
import { Quote } from '../../types/quote';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const QuoteDetails: React.FC = () => {
    const { quoteId } = useParams<{ quoteId: string }>();
    const [quote, setQuote] = useState<Quote | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuoteDetails = async () => {
            try {
                const data = await getQuoteDetails(quoteId);
                setQuote(data);
            } catch (err) {
                setError('Failed to fetch quote details');
            } finally {
                setLoading(false);
            }
        };

        fetchQuoteDetails();
    }, [quoteId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Card title="Quote Details">
            <h2>Quote Details</h2>
            {quote && (
                <div>
                    <h3>{quote.name}</h3>
                    <p><strong>Client:</strong> {quote.clientId}</p>
                    <p><strong>Event:</strong> {quote.eventId}</p>
                    <p><strong>Notes:</strong> {quote.notes}</p>
                    <h4>Items:</h4>
                    <ul>
                        {quote.items.map(item => (
                            <li key={item.inventoryId}>
                                Inventory ID: {item.inventoryId} - Quantity: {item.quantity} - Unit Price: ${item.unitPrice} - Total: ${item.total}
                            </li>
                        ))}
                    </ul>
                    <Button onClick={() => window.history.back()}>Back</Button>
                </div>
            )}
        </Card>
    );
};

export default QuoteDetails;