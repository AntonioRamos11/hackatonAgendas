import React, { useEffect, useState } from 'react';
import { listInvoices } from '../../api/invoices';
import Table from '../../components/common/Table';
import { Invoice } from '../../types/invoice';

const Invoices: React.FC = () => {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await listInvoices();
                setInvoices(response.data);
            } catch (err) {
                setError('Failed to fetch invoices');
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Invoices</h1>
            <Table
                headers={['Invoice ID', 'Client', 'Event', 'Amount', 'Due Date', 'Notes']}
                data={invoices}
            />
        </div>
    );
};

export default Invoices;