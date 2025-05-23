import React, { useState } from 'react';
import axios from '../../api/axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            // Redirect or reload as needed
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Login</button>
            {error && <div>{error}</div>}
        </form>
    );
};

export default Login;
