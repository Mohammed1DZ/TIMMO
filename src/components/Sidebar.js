import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const links = [
        { path: '/', label: 'Dashboard' },
        { path: '/properties', label: 'Properties' },
        { path: '/clients', label: 'Clients' },
        { path: '/agents', label: 'Agents' },
        { path: '/settings', label: 'Settings' }
    ];

    return (
        <nav className="w-64 h-screen bg-blue-900 text-white fixed p-6">
            <h1 className="text-2xl font-bold mb-10">TIMMO Dashboard</h1>
            <ul className="space-y-4">
                {links.map(link => (
                    <li key={link.path}>
                        <NavLink 
                            to={link.path}
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
        </nav>
    );
};

export default Sidebar;