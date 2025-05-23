import React, { useEffect, useState } from 'react';
import StaffList from '../../components/staff/StaffList';
import StaffForm from '../../components/staff/StaffForm';
import { listStaff } from '../../api/staff';
import { Staff } from '../../types/staff';

const StaffPage: React.FC = () => {
    const [staffMembers, setStaffMembers] = useState<Staff[]>([]);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

    useEffect(() => {
        const fetchStaffMembers = async () => {
            const data = await listStaff();
            setStaffMembers(data);
        };

        fetchStaffMembers();
    }, []);

    const handleEdit = (staff: Staff) => {
        setSelectedStaff(staff);
        setIsEditing(true);
    };

    const handleCloseForm = () => {
        setIsEditing(false);
        setSelectedStaff(null);
    };

    return (
        <div>
            <h1>Staff Management</h1>
            <StaffList staffMembers={staffMembers} onEdit={handleEdit} />
            {isEditing && (
                <StaffForm staff={selectedStaff} onClose={handleCloseForm} />
            )}
        </div>
    );
};

export default StaffPage;