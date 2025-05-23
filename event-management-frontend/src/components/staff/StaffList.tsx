import React from 'react';
import { Staff } from '../../types/staff';
import Table from '../common/Table';

interface StaffListProps {
    staffMembers: Staff[];
    onEdit: (staff: Staff) => void;
}

const StaffList: React.FC<StaffListProps> = ({ staffMembers, onEdit }) => {
    return (
        <div>
            <h1>Staff List</h1>
            <Table
                headers={['Name', 'Email', 'Phone', 'Role', 'Position']}
                data={staffMembers}
            />
        </div>
    );
};

export default StaffList;