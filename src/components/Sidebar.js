import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import Logo from '../images/logo1.png';  // Adjust path if needed
import * as icons from 'react-icons/fa';  // Dynamically load icons

const Sidebar = ({ userRole }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [links, setLinks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch sidebar links from the backend
        const fetchLinks = async () => {
            try {
                const response = await fetch('https://your-serverless-endpoint/sidebar-links', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ role: userRole }),  // Send the user role to the backend
                });
                const data = await response.json();
                setLinks(data.links);
            } catch (error) {
                console.error('Error fetching sidebar links:', error);
            }
        };

        fetchLinks();
    }, [userRole]);

    const handleLogout = () => {
        localStorage.clear();  // Clear session data if applicable
        alert('You have successfully logged out.');
        navigate('/login');  // Redirect to the login page
    };

    return (
        <div
            className={`bg-primary text-white h-screen transition-all duration-300 ${
                isHovered ? 'w-48' : 'w-16'
            } flex flex-col items-center justify-between`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Logo Section */}
            <div className="mt-4">
                <img src={Logo} alt="Logo" className="w-10 h-10" />
            </div>

            {/* Navigation Links */}
            <ul className="space-y-6 w-full">
                {links.map((link) => {
                    // Dynamically render icons
                    const IconComponent = icons[link.icon];
                    return (
                        <li key={link.path} className="w-full">
                            <NavLink
                                to={link.path}
                                className={({ isActive }) =>
                                    `flex items-center space-x-4 p-2 rounded-md transition-colors duration-300 ${
                                        isActive
                                            ? 'bg-accent text-black'
                                            : 'text-gray-300 hover:bg-gray-700'
                                    }`
                                }
                            >
                                <div className="ml-2">{IconComponent && <IconComponent size={25} />}</div>
                                {isHovered && <span className="text-sm font-medium">{link.label}</span>}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>

            {/* Logout Button */}
            <button
                onClick={handleLogout}
                className="mb-6 flex items-center space-x-2 p-2 rounded-md transition-colors duration-300 text-gray-300 hover:text-white hover:bg-red-600 w-full"
            >
                <FaSignOutAlt size={25} className="ml-2" />
                {isHovered && <span className="text-sm font-medium">Logout</span>}
            </button>
        </div>
    );
};

export default Sidebar;