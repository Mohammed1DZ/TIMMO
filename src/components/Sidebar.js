import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaBuilding, FaUsers, FaCogs, FaUserTie } from 'react-icons/fa';  // Icons

const Sidebar = () => {
    const links = [
        { path: '/', label: 'Dashboard', icon: <FaHome size={35} /> },
        { path: '/properties', label: 'Properties', icon: <FaBuilding size={35} /> },
        { path: '/clients', label: 'Clients', icon: <FaUsers size={35} /> },
        { path: '/agents', label: 'Agents', icon: <FaUserTie size={35} /> },
        { path: '/settings', label: 'Settings', icon: <FaCogs size={35} /> },
    ];

    return (
        <div className="w-27 md:w-24 lg:w-27 bg-primary h-screen p-2 md:p-4 lg:p-4 text-white flex flex-col items-center">
            {/* Logo Section */}
            <div className="mb-8">
                <img src="src/images/logo1.png" alt="Logo" className="w-16 md:w-20 lg:w-24" />
            </div>

            {/* Navigation Links */}
            <ul className="space-y-4 md:space-y-6">
                {links.map((link) => (
                    <li key={link.path}>
                        <NavLink
                            to={link.path}
                            className={({ isActive }) =>
                                `flex flex-col items-center text-center p-3 md:p-4 lg:p-5 rounded-lg transition-colors duration-300 ${
                                    isActive
                                        ? 'bg-accent text-black'
                                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                                }`
                            }
                        >
                            {link.icon}
                            <span className="mt-2 text-sm md:text-base">{link.label}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
