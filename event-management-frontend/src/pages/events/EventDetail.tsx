import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { getEventDetail, deleteEvent } from '../../api/events';
import './EventDetail.css';

interface EventData {
  id: string;
  name: string;
  date: string;
  endDate: string;
  location: string;
  clientId: string;
  clientName?: string;
  estimatedGuests: number;
  eventType: string;
  notes?: string;
}

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        const data = await getEventDetail(id);
        setEvent(data);
      } catch (err) {
        console.error('Error fetching event details:', err);
        setError('Failed to load event details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEventDetails();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id);
        history.push('/events');
      } catch (err) {
        console.error('Error deleting event:', err);
        setError('Failed to delete event. Please try again.');
      }
    }
  };

  if (loading) return <div className="loading">Loading event details...</div>;
  
  if (error) return <div className="error-message">{error}</div>;
  
  if (!event) return <div className="not-found">Event not found</div>;

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="event-detail">
      <div className="event-header">
        <h2>{event.name}</h2>
        <div className="event-actions">
          <Link to={`/events/edit/${id}`} className="btn-edit">Edit</Link>
          <button onClick={handleDelete} className="btn-delete">Delete</button>
        </div>
      </div>

      <div className="event-info">
        <div className="info-row">
          <div className="info-group">
            <label>Start Date</label>
            <p>{formatDate(event.date)}</p>
          </div>
          <div className="info-group">
            <label>End Date</label>
            <p>{formatDate(event.endDate)}</p>
          </div>
        </div>
        
        <div className="info-row">
          <div className="info-group">
            <label>Location</label>
            <p>{event.location}</p>
          </div>
          <div className="info-group">
            <label>Event Type</label>
            <p>{event.eventType}</p>
          </div>
        </div>
        
        <div className="info-row">
          <div className="info-group">
            <label>Client</label>
            <p>{event.clientName || event.clientId}</p>
          </div>
          <div className="info-group">
            <label>Estimated Guests</label>
            <p>{event.estimatedGuests}</p>
          </div>
        </div>
        
        {event.notes && (
          <div className="info-full">
            <label>Notes</label>
            <p className="notes">{event.notes}</p>
          </div>
        )}
      </div>
      
      <div className="back-button-container">
        <button onClick={() => history.push('/events')} className="btn-back">
          Back to Events
        </button>
      </div>
    </div>
  );
};

export default EventDetail;