import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { recordPayment } from '../../api/invoices';
import Button from '../common/Button';
import Input from '../common/Input';

const PaymentForm = () => {
    const { invoiceId } = useParams<{ invoiceId: string }>();
    const [amount, setAmount] = useState<number>(0);
    const [method, setMethod] = useState<string>('credit_card');
    const [reference, setReference] = useState<string>('');
    const [notes, setNotes] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await recordPayment(invoiceId, { amount, method, reference, notes });
            setSuccess('Payment recorded successfully!');
            // Reset form fields
            setAmount(0);
            setMethod('credit_card');
            setReference('');
            setNotes('');
        } catch (err) {
            setError('Failed to record payment. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Record Payment</h2>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
            <Input
                type="number"
                label="Amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                required
            />
            <Input
                type="text"
                label="Payment Method"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                required
            />
            <Input
                type="text"
                label="Reference"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
            />
            <Input
                type="text"
                label="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />
            <Button type="submit">Submit Payment</Button>
        </form>
    );
};

export default PaymentForm;