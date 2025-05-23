import React from 'react';
import { InventoryItem } from '../../types/inventory';
import Table from '../common/Table';

interface InventoryListProps {
    items: InventoryItem[];
}

const InventoryList: React.FC<InventoryListProps> = ({ items }) => {
    return (
        <div>
            <h1>Inventory List</h1>
            <Table
                headers={['Name', 'Category', 'Quantity', 'Unit Cost', 'Description']}
                data={items}
            />
        </div>
    );
};

export default InventoryList;