import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { register } from '../../api/auth';
import Input from '../common/Input';
import Button from '../common/Button';

const RegisterForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'client' | 'admin' | 'staff'>('client');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await register({ name, email, password, role });
            history.push('/login');
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            {error && <p className="error">{error}</p>}
            <Input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <select
                value={role}
                onChange={(e) => setRole(e.target.value as 'client' | 'admin' | 'staff')}
            >
                <option value="client">Client</option>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
            </select>
            <Button type="submit">Register</Button>
        </form>
    );
};

export default RegisterForm;