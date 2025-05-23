import React from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';

const MainLayout: React.FC = ({ children }) => {
    return (
        <div className="main-layout">
            <Navbar />
            <div className="layout-content">
                <Sidebar />
                <main>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainLayout;