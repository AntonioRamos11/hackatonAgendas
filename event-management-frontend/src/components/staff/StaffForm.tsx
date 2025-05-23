import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createStaff } from '../../api/staff';
import { Staff } from '../../types/staff';
import Button from '../common/Button';
import Input from '../common/Input';

interface StaffFormProps {
    staff: Staff | null;
    onClose: () => void;
}

const StaffForm: React.FC<StaffFormProps> = ({ staff, onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState<'staff' | 'admin'>('staff');
    const [position, setPosition] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await createStaff({ name, email, phone, role, position });
            history.push('/staff'); // Redirect to staff list after successful creation
        } catch (err) {
            setError('Failed to create staff member. Please try again.');
        }
    };

    return (
        <div>
            <h2>Add Staff Member</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
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
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <select value={role} onChange={e => setRole(e.target.value as 'staff' | 'admin')}>
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                </select>
                <Input
                    type="text"
                    placeholder="Position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    required
                />
                <Button type="submit">Add Staff</Button>
            </form>
        </div>
    );
};

export default StaffForm;