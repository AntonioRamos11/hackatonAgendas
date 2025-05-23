import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listEvents } from '../../api/events';
import './EventList.css';

interface Event {
  id: string;
  name: string;
  date: string;
  endDate: string;
  location: string;
  clientId: string;
  estimatedGuests: number;
  eventType: string;
  notes?: string;
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await listEvents();
        // Make sure data is an array
        if (Array.isArray(data)) {
          setEvents(data);
        } else if (data && Array.isArray(data.data)) {
          setEvents(data.data);
        } else {
          console.error('Unexpected data format:', data);
          setEvents([]);
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (loading) return <div className="loading">Loading events...</div>;
  
  if (error) return <div className="error-message">{error}</div>;

  if (events.length === 0) {
    return (
      <div className="no-events">
        <p>No events found. Create your first event!</p>
        <Link to="/events/create" className="btn-create">Create Event</Link>
      </div>
    );
  }

  return (
    <div className="event-list">
      <table className="events-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>End Date</th>
            <th>Location</th>
            <th>Client ID</th>
            <th>Guests</th>
            <th>Event Type</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{formatDate(event.date)}</td>
              <td>{formatDate(event.endDate)}</td>
              <td>{event.location}</td>
              <td>{event.clientId}</td>
              <td>{event.estimatedGuests}</td>
              <td>{event.eventType}</td>
              <td>{event.notes || '-'}</td>
              <td>
                <Link to={`/events/${event.id}`} className="btn-view">View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventList;