import React, { useEffect, useState } from 'react';
import { getEventTimeline } from '../../api/events';
import { EventTimeline } from '../../types/event';

const Timeline: React.FC<{ eventId: string }> = ({ eventId }) => {
    const [timeline, setTimeline] = useState<EventTimeline[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTimeline = async () => {
            try {
                const data = await getEventTimeline(eventId);
                // Map EventTimelineItem[] to EventTimeline[]
                const mapped = Array.isArray(data)
                  ? data.map(item => ({
                        id: item.id,
                        title: item.title,
                        description: item.description,
                        date: item.time // or format as needed
                    }))
                  : [];
                setTimeline(mapped);
            } catch (err) {
                setError('Failed to fetch event timeline');
            } finally {
                setLoading(false);
            }
        };

        fetchTimeline();
    }, [eventId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Event Timeline</h2>
            <ul>
                {timeline.map((item) => (
                    <li key={item.id}>
                        <strong>{item.title}</strong>: {item.description} at {item.date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Timeline;