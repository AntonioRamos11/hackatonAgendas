import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createEvent } from '../../api/events';
import Input from '../common/Input';
import Button from '../common/Button';

const EventForm = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [location, setLocation] = useState('');
    const [clientId, setClientId] = useState('');
    const [estimatedGuests, setEstimatedGuests] = useState(0);
    const [eventType, setEventType] = useState('');
    const [notes, setNotes] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const eventData = {
                name,
                date,
                endDate,
                location,
                clientId,
                estimatedGuests,
                eventType,
                notes,
            };
            await createEvent(eventData);
            history.push('/events');
        } catch (err) {
            setError('Failed to create event. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Event</h2>
            {error && <p className="error">{error}</p>}
            <Input
                label="Event Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <Input
                label="Start Date"
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <Input
                label="End Date"
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
            />
            <Input
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
            />
            <Input
                label="Client ID"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                required
            />
            <Input
                label="Estimated Guests"
                type="number"
                value={estimatedGuests}
                onChange={(e) => setEstimatedGuests(Number(e.target.value))}
                required
            />
            <Input
                label="Event Type"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                required
            />
            <Input
                label="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />
            <Button type="submit">Create Event</Button>
        </form>
    );
};

export default EventForm;