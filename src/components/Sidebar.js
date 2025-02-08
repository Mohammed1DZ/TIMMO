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
        <div className="w-64 h-screen bg-primary p-6 text-white fixed">
            <h1 className="text-3xl font-bold mb-8">TIMMO Dashboard</h1>
            <ul className="space-y-6">
                {links.map(link => (
                    <li key={link.path}>
                        <NavLink 
                            to={link.path}
                            className={({ isActive }) =>
                                `block p-3 rounded text-lg font-medium ${
                                    isActive ? 'bg-accent' : 'hover:bg-accent'
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
