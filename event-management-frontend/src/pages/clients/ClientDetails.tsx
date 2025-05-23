import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getClientDetails } from '../../api/clients';
import { Client } from '../../types/client';
import Card from '../../components/common/Card';
import Loader from '../../components/common/Loader';

const ClientDetails: React.FC = () => {
    const { clientId } = useParams<{ clientId: string }>();
    const [client, setClient] = useState<Client | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchClientDetails = async () => {
            try {
                const data = await getClientDetails(clientId);
                setClient(data);
            } catch (err) {
                setError('Failed to fetch client details.');
            } finally {
                setLoading(false);
            }
        };

        fetchClientDetails();
    }, [clientId]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Card title="Client Details">
            <h2>Client Details</h2>
            {client && (
                <div>
                    <p><strong>Name:</strong> {client.name}</p>
                    <p><strong>Email:</strong> {client.email}</p>
                    <p><strong>Phone:</strong> {client.phone}</p>
                    <p><strong>Company:</strong> {client.company}</p>
                    <p><strong>Notes:</strong> {client.notes}</p>
                </div>
            )}
        </Card>
    );
};

export default ClientDetails;