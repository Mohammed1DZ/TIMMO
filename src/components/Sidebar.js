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
        <div className="w-64 bg-primary h-screen p-4 text-white">
            <h1 className="text-2xl font-bold mb-6">TIMMO Dashboard</h1>
            <ul className="space-y-4">
                {links.map(link => (
                    <li key={link.path}>
                        <NavLink to={link.path} className="block p-2 rounded hover:bg-accent">
                            {link.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
