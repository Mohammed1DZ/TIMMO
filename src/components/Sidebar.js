import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaBuilding, FaUsers, FaCogs, FaUserTie } from 'react-icons/fa';  // Import icons

const Sidebar = () => {
    const links = [
        { path: '/', label: 'Dashboard', icon: <FaHome size={30} /> },
        { path: '/properties', label: 'Properties', icon: <FaBuilding size={30} /> },
        { path: '/clients', label: 'Clients', icon: <FaUsers size={30} /> },
        { path: '/agents', label: 'Agents', icon: <FaUserTie size={30} /> },
        { path: '/settings', label: 'Settings', icon: <FaCogs size={30} /> },
    ];

    return (
        <div className="w-64 bg-primary h-screen p-4 text-white flex flex-col items-center">
            {/* Logo Section */}
            <div className="mb-8">
                <img src="images/logo.png" alt="Logo" className="w-16 h-16" />
            </div>

            {/* Navigation Links */}
            <ul className="space-y-8 w-full">
                {links.map((link) => (
                    <li key={link.path}>
                        <NavLink
                            to={link.path}
                            className={({ isActive }) =>
                                `flex flex-col items-center text-center p-3 rounded-lg ${
                                    isActive ? 'bg-accent text-black' : 'hover:bg-gray-700'
                                }`
                            }
                        >
                            {link.icon}
                            <span className="mt-2 text-sm">{link.label}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;