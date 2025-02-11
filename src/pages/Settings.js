import React, { useState, useEffect } from 'react';
import RoleManagementForm from '../components/RoleManagementForm';
import SidebarLinkManagement from '../components/SidebarLinkManagement';
import FormFieldManagement from '../components/FormFieldManagement';

const Settings = ({ userRole }) => {
    const [activeSection, setActiveSection] = useState('roleManagement');
    const [users, setUsers] = useState([]);
    const [sidebarLinks, setSidebarLinks] = useState([]);
    const [formFields, setFormFields] = useState([]);

    // Fetch data from the backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userRes, sidebarRes, formFieldRes] = await Promise.all([
                    fetch('https://timmodashboard.netlify.app/.netlify/functions/getUsers'),
                    fetch('https://timmodashboard.netlify.app/.netlify/functions/getSidebarLinks'),
                    fetch('https://timmodashboard.netlify.app/.netlify/functions/getFormFields')
                ]);

                const usersData = await userRes.json();
                const sidebarData = await sidebarRes.json();
                const formFieldsData = await formFieldRes.json();

                setUsers(usersData);
                setSidebarLinks(sidebarData.links || []);
                setFormFields(formFieldsData.fields || []);
            } catch (error) {
                console.error('Error fetching settings data:', error);
            }
        };

        fetchData();
    }, []);

    // Backend update functions
    const handleSaveUser = async (newUser) => {
        try {
            const response = await fetch('https://timmodashboard.netlify.app/.netlify/functions/updateUsers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            });
            if (response.ok) {
                const updatedUsers = await response.json();
                setUsers(updatedUsers);
            }
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    const handleSidebarUpdate = async (updatedLinks) => {
        try {
            await fetch('https://timmodashboard.netlify.app/.netlify/functions/updateSidebarLinks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedLinks)
            });
            setSidebarLinks(updatedLinks);
        } catch (error) {
            console.error('Error updating sidebar links:', error);
        }
    };

    const handleFormFieldUpdate = async (updatedFields) => {
        try {
            await fetch('https://timmodashboard.netlify.app/.netlify/functions/updateFormFields', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedFields)
            });
            setFormFields(updatedFields);
        } catch (error) {
            console.error('Error updating form fields:', error);
        }
    };

    // Dynamic section rendering
    const renderSection = () => {
        switch (activeSection) {
            case 'roleManagement':
                return <RoleManagementForm users={users} onSaveUser={handleSaveUser} />;
            case 'sidebar':
                return <SidebarLinkManagement sidebarLinks={sidebarLinks} onSidebarUpdate={handleSidebarUpdate} userRole={userRole} />;
            case 'formFields':
                return <FormFieldManagement formFields={formFields} onFormFieldUpdate={handleFormFieldUpdate} />;
            default:
                return null;
        }
    };

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6">Settings - Manage Users, Sidebar, and Forms</h1>

            {/* Section Tabs */}
            <div className="flex gap-4 mb-6">
                <button
                    className={`px-4 py-2 rounded transition duration-200 ease-in-out focus:ring-2 ${
                        activeSection === 'roleManagement' ? 'bg-blue-500 text-white ring-blue-500' : 'bg-gray-200 hover:bg-gray-300 focus:ring-gray-300'
                    }`}
                    onClick={() => setActiveSection('roleManagement')}
                >
                    Role Management
                </button>
                <button
                    className={`px-4 py-2 rounded transition duration-200 ease-in-out focus:ring-2 ${
                        activeSection === 'sidebar' ? 'bg-blue-500 text-white ring-blue-500' : 'bg-gray-200 hover:bg-gray-300 focus:ring-gray-300'
                    }`}
                    onClick={() => setActiveSection('sidebar')}
                >
                    Sidebar Management
                </button>
                <button
                    className={`px-4 py-2 rounded transition duration-200 ease-in-out focus:ring-2 ${
                        activeSection === 'formFields' ? 'bg-blue-500 text-white ring-blue-500' : 'bg-gray-200 hover:bg-gray-300 focus:ring-gray-300'
                    }`}
                    onClick={() => setActiveSection('formFields')}
                >
                    Form Field Management
                </button>
            </div>

            {/* Dynamic Content */}
            <div>{renderSection()}</div>
        </div>
    );
};

export default Settings;
