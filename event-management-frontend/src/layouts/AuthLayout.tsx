import React from 'react';
import { Route } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';

const AuthLayout: React.FC = (props) => {
    return (
        <div className="auth-layout">
            <Navbar />
            <div className="auth-layout__content">
                <Sidebar />
                <main className="auth-layout__main">
                    {props.children}
                </main>
            </div>
        </div>
    );
};

export default AuthLayout;