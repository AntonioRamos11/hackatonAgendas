import React from 'react';
import { Client } from '../../types/client';
import Table from '../common/Table';

interface ClientListProps {
    clients: Client[];
    onEdit: (client: Client) => void;
}

const ClientList: React.FC<ClientListProps> = ({ clients, onEdit }) => {
    return (
        <div>
            <h1>Client List</h1>
            <Table
                headers={['Name', 'Email', 'Phone', 'Company', 'Notes']}
                data={clients}
            />
        </div>
    );
};

export default ClientList;