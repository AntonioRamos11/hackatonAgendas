import React, { useState } from 'react';
import { createClient } from '../../api/clients';
import { Client } from '../../types/client';
import Input from '../common/Input';
import Button from '../common/Button';

interface ClientFormProps {
    client: Client | null;
    onClose: () => void;
    onSuccess: () => void;
}

const ClientForm: React.FC<ClientFormProps> = ({ client, onClose, onSuccess }) => {
    const [name, setName] = useState(client?.name || '');
    const [email, setEmail] = useState(client?.email || '');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState(client?.phone || '');
    const [company, setCompany] = useState(client?.company || '');
    const [notes, setNotes] = useState(client?.notes || '');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await createClient({ name, email, password, phone, company, notes });
            onSuccess();
        } catch (err) {
            setError('Failed to create client. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <label>
                Name
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Input
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <Input
                label="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />
            <Input
                label="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />
            <Button type="submit">Create Client</Button>
            <Button type="button" onClick={onClose}>Cancel</Button>
        </form>
    );
};

export default ClientForm;