import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
    const location = useLocation();
    const isAuthenticated = localStorage.getItem('token');
    
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Event Management</Link>
            </div>
            
            <ul className="navbar-menu">
                <li>
                    <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/events" className={location.pathname.includes('/events') ? 'active' : ''}>
                        Events
                    </Link>
                </li>
                <li>
                    <Link to="/clients" className={location.pathname.includes('/clients') ? 'active' : ''}>
                        Clients
                    </Link>
                </li>
                <li>
                    <Link to="/invoices" className={location.pathname.includes('/invoices') ? 'active' : ''}>
                        Invoices
                    </Link>
                </li>
                <li>
                    <Link to="/quotes" className={location.pathname.includes('/quotes') ? 'active' : ''}>
                        Quotes
                    </Link>
                </li>
                <li>
                    <Link to="/staff" className={location.pathname.includes('/staff') ? 'active' : ''}>
                        Staff
                    </Link>
                </li>
                <li>
                    <Link to="/inventory" className={location.pathname.includes('/inventory') ? 'active' : ''}>
                        Inventory
                    </Link>
                </li>
            </ul>
            
            <div className="navbar-auth">
                {!isAuthenticated ? (
                    <>
                        <Link to="/auth/login" className="navbar-auth-link">Login</Link>
                        <Link to="/auth/register" className="navbar-auth-link">Register</Link>
                    </>
                ) : (
                    <Link to="/auth/logout" className="navbar-auth-link">Logout</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

