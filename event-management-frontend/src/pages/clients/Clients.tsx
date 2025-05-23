import React, { useEffect, useState } from 'react';
import ClientList from '../../components/clients/ClientList';
import ClientForm from '../../components/clients/ClientForm';
import { listClients } from '../../api/clients';
import { Client } from '../../types/client';

const Clients: React.FC = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);

    useEffect(() => {
        const fetchClients = async () => {
            const data = await listClients();
            setClients(data);
        };

        fetchClients();
    }, []);

    const handleEdit = (client: Client) => {
        setSelectedClient(client);
        setIsEditing(true);
    };

    const handleCloseForm = () => {
        setIsEditing(false);
        setSelectedClient(null);
    };

    return (
        <div>
            <h1>Clients</h1>
            <ClientList clients={clients} onEdit={handleEdit} />
            {isEditing && (
                <ClientForm
                    client={selectedClient}
                    onClose={handleCloseForm}
                    onSuccess={() => {
                        // Optionally, refresh the client list or close the form
                        setIsEditing(false);
                        setSelectedClient(null);
                        // Optionally, refetch clients here
                    }}
                />
            )}
        </div>
    );
};

export default Clients;