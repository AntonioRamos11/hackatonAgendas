import React, { useState } from 'react';
import { createInventoryItem } from '../../api/inventory';
import Input from '../common/Input';
import Button from '../common/Button';

const InventoryForm = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [unitCost, setUnitCost] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const item = {
                name,
                category,
                quantity,
                unitCost: parseFloat(unitCost),
                description,
            };
            await createInventoryItem(item);
            setSuccess('Inventory item created successfully!');
            setName('');
            setCategory('');
            setQuantity(0);
            setUnitCost('');
            setDescription('');
        } catch (err) {
            setError('Failed to create inventory item. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Inventory Item</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <Input
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <Input
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            />
            <Input
                label="Quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                required
            />
            <Input
                label="Unit Cost"
                type="number"
                value={unitCost}
                onChange={(e) => setUnitCost(e.target.value)}
                required
            />
            <Input
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Button type="submit">Add Item</Button>
        </form>
    );
};

export default InventoryForm;