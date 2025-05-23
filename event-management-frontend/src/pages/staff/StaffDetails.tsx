import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStaffDetails } from '../../api/staff';
import { Staff } from '../../types/staff';
import Card from '../../components/common/Card';
import Loader from '../../components/common/Loader';

const StaffDetails: React.FC = () => {
    const { staffId } = useParams<{ staffId: string }>();
    const [staff, setStaff] = useState<Staff | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStaffDetails = async () => {
            try {
                const response = await getStaffDetails(staffId);
                setStaff(response.data);
            } catch (err) {
                setError('Failed to fetch staff details');
            } finally {
                setLoading(false);
            }
        };

        fetchStaffDetails();
    }, [staffId]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Card title={staff?.name || 'Staff Details'}>
            <h2>{staff?.name}</h2>
            <p>Email: {staff?.email}</p>
            <p>Phone: {staff?.phone}</p>
            <p>Position: {staff?.position}</p>
            <p>Notes: {staff?.notes}</p>
        </Card>
    );
};

export default StaffDetails;