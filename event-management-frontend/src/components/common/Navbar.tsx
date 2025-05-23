import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Event Management</Link>
            </div>
            <ul className="navbar-menu">
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/clients">Clients</Link></li>
                <li><Link to="/invoices">Invoices</Link></li>
                <li><Link to="/quotes">Quotes</Link></li>
                <li><Link to="/staff">Staff</Link></li>
            </ul>
            <ul className="navbar-auth">
                <li>
                    <Link to="/auth/login" className="navbar-auth-link">Login</Link>
                </li>
                <li>
                    <Link to="/auth/register" className="navbar-auth-link">Register</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;

