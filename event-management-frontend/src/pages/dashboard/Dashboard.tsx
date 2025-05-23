import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Add this import for Link
import './Dashboard.css';

// You'll need to import your API functions
import { listEvents } from '../../api/events';
import { listClients } from '../../api/clients';
import { listInvoices } from '../../api/invoices';
import { listQuotes } from '../../api/quotes';
import { listStaff } from '../../api/staff';

interface CountData {
    events: number;
    clients: number;
    invoices: number;
    quotes: number;
    staff: number;
}

const Dashboard: React.FC = () => {
    const [counts, setCounts] = useState<CountData>({
        events: 0,
        clients: 0,
        invoices: 0,
        quotes: 0,
        staff: 0
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                // Use try/catch for each API call to prevent one failure from breaking everything
                let eventsCount = 0;
                let clientsCount = 0;
                let invoicesCount = 0;
                let quotesCount = 0;
                let staffCount = 0;
                
                try {
                    const eventsData = await listEvents();
                    eventsCount = Array.isArray(eventsData) ? eventsData.length : 0;
                } catch (err) {
                    console.error('Error fetching events:', err);
                }
                
                try {
                    const clientsData = await listClients();
                    clientsCount = Array.isArray(clientsData) ? clientsData.length : 0;
                } catch (err) {
                    console.error('Error fetching clients:', err);
                }
                
                try {
                    const invoicesData = await listInvoices();
                    invoicesCount = Array.isArray(invoicesData) ? invoicesData.length : 0;
                } catch (err) {
                    console.error('Error fetching invoices:', err);
                }
                
                try {
                    const quotesData = await listQuotes();
                    quotesCount = Array.isArray(quotesData) ? quotesData.length : 0;
                } catch (err) {
                    console.error('Error fetching quotes:', err);
                }
                
                try {
                    const staffData = await listStaff();
                    staffCount = Array.isArray(staffData) ? staffData.length : 0;
                } catch (err) {
                    console.error('Error fetching staff:', err);
                }
                
                setCounts({
                    events: eventsCount,
                    clients: clientsCount,
                    invoices: invoicesCount,
                    quotes: quotesCount,
                    staff: staffCount
                });
            } catch (err) {
                setError('Failed to fetch dashboard data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCounts();
    }, []);

    if (loading) {
        return <div className="dashboard-loading">Loading dashboard...</div>;
    }

    if (error) {
        return <div className="dashboard-error">{error}</div>;
    }

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon events-icon">📅</div>
                    <div className="stat-content">
                        <h3>Events</h3>
                        <div className="stat-count">{counts.events}</div>
                        <Link to="/events" className="stat-link">View All</Link>
                    </div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-icon clients-icon">👥</div>
                    <div className="stat-content">
                        <h3>Clients</h3>
                        <div className="stat-count">{counts.clients}</div>
                        <Link to="/clients" className="stat-link">View All</Link>
                    </div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-icon invoices-icon">💰</div>
                    <div className="stat-content">
                        <h3>Invoices</h3>
                        <div className="stat-count">{counts.invoices}</div>
                        <Link to="/invoices" className="stat-link">View All</Link>
                    </div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-icon quotes-icon">📝</div>
                    <div className="stat-content">
                        <h3>Quotes</h3>
                        <div className="stat-count">{counts.quotes}</div>
                        <Link to="/quotes" className="stat-link">View All</Link>
                    </div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-icon staff-icon">👤</div>
                    <div className="stat-content">
                        <h3>Staff</h3>
                        <div className="stat-count">{counts.staff}</div>
                        <Link to="/staff" className="stat-link">View All</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;