import React from 'react';
import { Event } from '../../types/event';
import Table from '../common/Table';

interface EventListProps {
    events: Event[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
    return (
        <div>
            <h1>Event List</h1>
            <Table
                headers={['Name', 'Date', 'End Date', 'Location', 'Client ID', 'Estimated Guests', 'Event Type', 'Notes']}
                data={events}
            />
        </div>
    );
};

export default EventList;