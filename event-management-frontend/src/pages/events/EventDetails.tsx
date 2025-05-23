import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventDetails } from '../../api/events';
import { Event } from '../../types/event';
import Card from '../../components/common/Card';
import Loader from '../../components/common/Loader';

const EventDetails: React.FC = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const data = await getEventDetails(eventId);
                setEvent(data);
            } catch (err) {
                setError('Failed to fetch event details.');
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [eventId]);

    if (loading) return <Loader />;
    if (error) return <div className="error">{error}</div>;

    return (
        <Card title={event?.name || 'Event Details'}>
            <h1>{event?.name}</h1>
            <p>
                <strong>Date:</strong>{' '}
                {event?.date ? new Date(event.date).toLocaleDateString() : 'N/A'}
            </p>
            <p><strong>Location:</strong> {event?.location}</p>
            <p><strong>Estimated Guests:</strong> {event?.estimatedGuests}</p>
            <p><strong>Notes:</strong> {event?.notes}</p>
        </Card>
    );
};

export default EventDetails;