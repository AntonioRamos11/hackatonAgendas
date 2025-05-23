import React, { useState } from 'react';
import axios from '../../api/axios';
import { useHistory } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'client' | 'admin' | 'staff'>('client');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('/auth/register', {
                name,
                email,
                password,
                role,
            });
            localStorage.setItem('token', response.data.token);
            history.push('/dashboard'); // Redirect after successful registration
        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                'Registration failed. Please try again.'
            );
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <h2>Register</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            <select value={role} onChange={e => setRole(e.target.value as 'client' | 'admin' | 'staff')}>
                <option value="client">Client</option>
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
            </select>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;