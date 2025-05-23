import React, { useEffect, useState } from 'react';
import { listEvents } from '../../api/events';
import EventList from '../../components/events/EventList';
import { Event } from '../../types/event';

const Events: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await listEvents();
                setEvents(response.data);
            } catch (err) {
                setError('Failed to fetch events');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Events</h1>
            <EventList events={events} />
        </div>
    );
};

export default Events;