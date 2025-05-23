import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <h2>Event Management</h2>
            <ul>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/clients">Clients</Link>
                </li>
                <li>
                    <Link to="/events">Events</Link>
                </li>
                <li>
                    <Link to="/inventory">Inventory</Link>
                </li>
                <li>
                    <Link to="/invoices">Invoices</Link>
                </li>
                <li>
                    <Link to="/quotes">Quotes</Link>
                </li>
                <li>
                    <Link to="/staff">Staff</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;