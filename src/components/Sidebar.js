import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const links = [
        { path: '/', label: 'Dashboard' },
        { path: '/properties', label: 'Properties' },
        { path: '/clients', label: 'Clients' },
        { path: '/agents', label: 'Agents' },
        { path: '/settings', label: 'Settings' }
    ];

    return (
        <div
            className={`fixed top-0 left-0 h-screen w-64 bg-blue-900 text-white p-6 z-30 transition-transform transform ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:translate-x-0`}
        >
            <h1 className="text-2xl font-bold mb-10">TIMMO Dashboard</h1>
            <ul className="space-y-4">
                {links.map(link => (
                    <li key={link.path}>
                        <NavLink
                            to={link.path}
                            onClick={toggleSidebar}
                            className={({ isActive }) =>
                                `block p-2 rounded text-lg font-medium ${
                                    isActive ? 'bg-blue-700' : 'hover:bg-blue-800'
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;