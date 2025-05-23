import React, { useEffect, useState } from 'react';
import InventoryList from '../../components/inventory/InventoryList';
import InventoryForm from '../../components/inventory/InventoryForm';
import { listInventory } from '../../api/inventory';
import { InventoryItem } from '../../types/inventory';

const Inventory: React.FC = () => {
    const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInventoryItems = async () => {
            try {
                const items = await listInventory();
                setInventoryItems(items);
            } catch (err) {
                setError('Failed to fetch inventory items');
            } finally {
                setLoading(false);
            }
        };

        fetchInventoryItems();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Inventory Management</h1>
            <InventoryForm />
            <InventoryList items={inventoryItems} />
        </div>
    );
};

export default Inventory;