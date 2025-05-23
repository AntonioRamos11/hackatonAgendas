import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getInvoiceDetails } from '../../api/invoices';
import { Invoice } from '../../types/invoice';
import Card from '../../components/common/Card';
import Loader from '../../components/common/Loader';

const InvoiceDetails: React.FC = () => {
    const { invoiceId } = useParams<{ invoiceId: string }>();
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInvoiceDetails = async () => {
            try {
                const data = await getInvoiceDetails(invoiceId);
                setInvoice(data);
            } catch (err) {
                setError('Failed to fetch invoice details');
            } finally {
                setLoading(false);
            }
        };

        fetchInvoiceDetails();
    }, [invoiceId]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Card title="Invoice Details">
            <h2>Invoice Details</h2>
            {invoice && (
                <div>
                    <p><strong>Invoice ID:</strong> {invoice.id}</p>
                    <p><strong>Client:</strong> {invoice.clientId}</p>
                    <p><strong>Event:</strong> {invoice.eventId}</p>
                    <p><strong>Amount:</strong> ${invoice.amount.toFixed(2)}</p>
                    <p><strong>Due Date:</strong> {new Date(invoice.dueDate).toLocaleDateString()}</p>
                    <p><strong>Notes:</strong> {invoice.notes}</p>
                </div>
            )}
        </Card>
    );
};

export default InvoiceDetails;