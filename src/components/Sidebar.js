import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaBuilding, FaUsers, FaCogs, FaUserTie } from 'react-icons/fa';  // Icons

const Sidebar = () => {
    const links = [
        { path: '/', label: 'Dashboard', icon: <FaHome size={40} /> },
        { path: '/properties', label: 'Properties', icon: <FaBuilding size={40} /> },
        { path: '/clients', label: 'Clients', icon: <FaUsers size={40} /> },
        { path: '/agents', label: 'Agents', icon: <FaUserTie size={40} /> },
        { path: '/settings', label: 'Settings', icon: <FaCogs size={40} /> },
    ];

    return (
        <div className="w-72 bg-primary h-screen p-6 text-white flex flex-col items-center">
            {/* Logo Section */}
            <div className="mb-12">
                <img src="src/images/logo.png" alt="Logo" className="w-20 h-20" />
            </div>

            {/* Navigation Links */}
            <ul className="space-y-10 w-full">
                {links.map((link) => (
                    <li key={link.path}>
                        <NavLink
                            to={link.path}
                            className={({ isActive }) =>
                                `flex flex-col items-center text-center p-4 rounded-lg transition-colors duration-300 ${
                                    isActive
                                        ? 'bg-accent text-black'
                                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                                }`
                            }
                        >
                            {link.icon}
                            <span className="mt-2 text-lg">{link.label}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;