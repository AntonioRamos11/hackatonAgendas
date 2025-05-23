import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getInventoryItem } from '../../api/inventory';
import { InventoryItem } from '../../types/inventory';
import Card from '../../components/common/Card';
import Loader from '../../components/common/Loader';

const InventoryDetails: React.FC = () => {
    const { inventoryId } = useParams<{ inventoryId: string }>();
    const [inventoryItem, setInventoryItem] = useState<InventoryItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInventoryItem = async () => {
            try {
                const item = await getInventoryItem(inventoryId);
                setInventoryItem(item);
            } catch (error) {
                console.error('Error fetching inventory item:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInventoryItem();
    }, [inventoryId]);

    if (loading) {
        return <Loader />;
    }

    if (!inventoryItem) {
        return <div>Inventory item not found.</div>;
    }

    return (
        <Card title={inventoryItem.name}>
            <h2>{inventoryItem.name}</h2>
            <p>Category: {inventoryItem.category}</p>
            <p>Quantity: {inventoryItem.quantity}</p>
            <p>Unit Cost: ${inventoryItem.unitCost}</p>
            <p>Description: {inventoryItem.description}</p>
        </Card>
    );
};

export default InventoryDetails;