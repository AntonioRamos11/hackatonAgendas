import React, { useEffect, useState } from 'react';
import { listClients } from '../../api/clients';
import { listEvents } from '../../api/events';
import { listInvoices } from '../../api/invoices';
import { listQuotes } from '../../api/quotes';
import { listStaff } from '../../api/staff';
import Card from '../../components/common/Card';
import './Dashboard.css';

import { Client } from '../../types/client';
import { Event } from '../../types/event';
import { Invoice } from '../../types/invoice';
import { Quote } from '../../types/quote';
import { Staff } from '../../types/staff';

const Dashboard = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [staff, setStaff] = useState<Staff[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const clientsData = await listClients();
                const eventsData = await listEvents();
                const invoicesData = await listInvoices();
                const quotesData = await listQuotes();
                const staffData = await listStaff();

                setClients(clientsData);
                setEvents(eventsData);
                setInvoices(invoicesData);
                setQuotes(quotesData);
                setStaff(staffData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="dashboard-cards">
                <Card title="Clients" count={clients.length} />
                <Card title="Events" count={events.length} />
                <Card title="Invoices" count={invoices.length} />
                <Card title="Quotes" count={quotes.length} />
                <Card title="Staff" count={staff.length} />
            </div>
        </div>
    );
};

export default Dashboard;