import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaBuilding, FaUsers, FaCogs, FaUserTie, FaSignOutAlt } from 'react-icons/fa';
import Logo from '../images/logo1.png';  // Adjust path if needed

const Sidebar = ({ userRole }) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    // Debugging: See current userRole
    console.log('Current User Role:', userRole);

    const handleLogout = () => {
        // Clear any stored session data (if applicable)
        localStorage.clear();  // Adjust as needed
        alert('You have successfully logged out.');
        navigate('/login');  // Redirect to the login page
    };

    // Dynamic link setup based on user role
    const links = [
        { path: '/', label: 'Dashboard', icon: <FaHome size={25} /> },
        { path: '/properties', label: 'Properties', icon: <FaBuilding size={25} /> },
        { path: '/clients', label: 'Clients', icon: <FaUsers size={25} /> },
        { path: '/agents', label: 'Agents', icon: <FaUserTie size={25} /> },
    ];

    // Show settings only for Super Admin and Admin
    if (userRole === 'Super Admin' || userRole === 'Admin') {
        links.push({ path: '/settings', label: 'Settings', icon: <FaCogs size={25} /> });
    }

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
                {links.map((link) => (
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
                            <div className="ml-2">{link.icon}</div>
                            {isHovered && <span className="text-sm font-medium">{link.label}</span>}
                        </NavLink>
                    </li>
                ))}
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