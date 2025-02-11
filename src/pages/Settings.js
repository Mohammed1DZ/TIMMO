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
                const userResponse = await fetch('https://timmodashboard.netlify.app/.netlify/functions/getUsers');
                const sidebarResponse = await fetch('https://timmodashboard.netlify.app/.netlify/functions/getSidebarLinks');
                const formFieldResponse = await fetch('https://timmodashboard.netlify.app/.netlify/functions/getFormFields');

                const usersData = await userResponse.json();
                const sidebarData = await sidebarResponse.json();
                const formFieldsData = await formFieldResponse.json();

                setUsers(usersData);
                setSidebarLinks(sidebarData.links);
                setFormFields(formFieldsData.fields);
            } catch (error) {
                console.error('Error fetching settings data:', error);
            }
        };

        fetchData();
    }, []);

    // Backend update functions
    const handleSaveUser = async (newUser) => {
        try {
            await fetch('https://timmodashboard.netlify.app/.netlify/functions/updateUsers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify([...users, newUser])
            });
            setUsers((prev) => [...prev, newUser]);
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

    // Updated permissions structure
    const permissionsChecklist = {
        buttons: {
            addUser: false,
            editUser: false,
            deleteUser: false,
            addProperty: false,
            editProperty: false,
            deleteProperty: false,
            addClient: false,
            editClient: false,
            deleteClient: false
        },
        forms: {
            clientForm: false,
            agentForm: false,
            propertyForm: false
        }
    };

    // Dynamic section rendering
    const renderSection = () => {
        switch (activeSection) {
            case 'roleManagement':
                return (
                    <RoleManagementForm
                        users={users}
                        onSaveUser={handleSaveUser}
                        permissions={permissionsChecklist} // Pass the updated checklist
                    />
                );
            case 'sidebar':
                return (
                    <SidebarLinkManagement
                        sidebarLinks={sidebarLinks}
                        onSidebarUpdate={handleSidebarUpdate}
                        userRole={userRole}
                    />
                );
            case 'formFields':
                return (
                    <FormFieldManagement
                        formFields={formFields}
                        onFormFieldUpdate={handleFormFieldUpdate}
                    />
                );
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
                        activeSection === 'roleManagement' 
                            ? 'bg-blue-500 text-white ring-blue-500' 
                            : 'bg-gray-200 hover:bg-gray-300 focus:ring-gray-300'
                    }`}
                    onClick={() => setActiveSection('roleManagement')}
                    aria-selected={activeSection === 'roleManagement'}
                >
                    Role Management
                </button>
                <button
                    className={`px-4 py-2 rounded transition duration-200 ease-in-out focus:ring-2 ${
                        activeSection === 'sidebar' 
                            ? 'bg-blue-500 text-white ring-blue-500' 
                            : 'bg-gray-200 hover:bg-gray-300 focus:ring-gray-300'
                    }`}
                    onClick={() => setActiveSection('sidebar')}
                    aria-selected={activeSection === 'sidebar'}
                >
                    Sidebar Management
                </button>
                <button
                    className={`px-4 py-2 rounded transition duration-200 ease-in-out focus:ring-2 ${
                        activeSection === 'formFields' 
                            ? 'bg-blue-500 text-white ring-blue-500' 
                            : 'bg-gray-200 hover:bg-gray-300 focus:ring-gray-300'
                    }`}
                    onClick={() => setActiveSection('formFields')}
                    aria-selected={activeSection === 'formFields'}
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
