import React from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';

const DashboardLayout: React.FC = (props) => {
    return (
        <div className="dashboard-layout">
            <Navbar />
            <div className="dashboard-content">
                <Sidebar />
                <main>
                    {props.children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;