import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createQuote } from '../../api/quotes';
import Input from '../common/Input';
import Button from '../common/Button';

type ItemField = 'inventoryId' | 'quantity' | 'unitPrice' | 'total';

const QuoteForm = () => {
    const [clientId, setClientId] = useState('');
    const [eventId, setEventId] = useState('');
    const [name, setName] = useState('');
    const [notes, setNotes] = useState('');
    const [items, setItems] = useState([{ inventoryId: '', quantity: 1, unitPrice: 0, total: 0 }]);
    const history = useHistory();

    const handleItemChange = (
        index: number,
        field: ItemField,
        value: string | number
    ) => {
        const newItems = [...items];
        if (field === 'quantity' || field === 'unitPrice' || field === 'total') {
            newItems[index][field] = Number(value);
        } else {
            newItems[index][field] = value as string;
        }
        if (field === 'quantity' || field === 'unitPrice') {
            newItems[index].total = newItems[index].quantity * newItems[index].unitPrice;
        }
        setItems(newItems);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const quoteData = {
            clientId,
            eventId,
            name,
            notes,
            items,
        };
        await createQuote(quoteData);
        history.push('/quotes');
    };

    const addItem = () => {
        setItems([...items, { inventoryId: '', quantity: 1, unitPrice: 0, total: 0 }]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                label="Client ID"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                required
            />
            <Input
                label="Event ID"
                value={eventId}
                onChange={(e) => setEventId(e.target.value)}
                required
            />
            <Input
                label="Quote Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <Input
                label="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />
            {items.map((item, index) => (
                <div key={index}>
                    <Input
                        label="Inventory ID"
                        value={item.inventoryId}
                        onChange={(e) => handleItemChange(index, 'inventoryId', e.target.value)}
                        required
                    />
                    <Input
                        label="Quantity"
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                        required
                    />
                    <Input
                        label="Unit Price"
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                        required
                    />
                    <Input
                        label="Total"
                        type="number"
                        value={item.total}
                        readOnly
                    />
                </div>
            ))}
            <Button type="button" onClick={addItem}>Add Item</Button>
            <Button type="submit">Submit Quote</Button>
        </form>
    );
};

export default QuoteForm;