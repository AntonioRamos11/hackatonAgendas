import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createInvoice } from '../../api/invoices';
import Button from '../common/Button';
import Input from '../common/Input';

const InvoiceForm = () => {
    const [clientId, setClientId] = useState('');
    const [eventId, setEventId] = useState('');
    const [amount, setAmount] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [notes, setNotes] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const invoiceData = {
                clientId,
                eventId,
                amount: parseFloat(amount),
                dueDate,
                notes,
            };
            await createInvoice(invoiceData);
            history.push('/invoices');
        } catch (err) {
            setError('Failed to create invoice. Please try again.');
        }
    };

    return (
        <div>
            <h2>Create Invoice</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Client ID"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    required
                />
                <Input
                    type="text"
                    placeholder="Event ID"
                    value={eventId}
                    onChange={(e) => setEventId(e.target.value)}
                    required
                />
                <Input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <Input
                    type="date"
                    placeholder="Due Date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
                <Input
                    type="text"
                    placeholder="Notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
                <Button type="submit">Create Invoice</Button>
            </form>
        </div>
    );
};

export default InvoiceForm;