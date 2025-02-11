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
                const userResponse = await fetch('https://your-serverless-endpoint/getUsers');
                const sidebarResponse = await fetch('https://your-serverless-endpoint/getSidebarLinks');
                const formFieldResponse = await fetch('https://your-serverless-endpoint/getFormFields');

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
            await fetch('https://your-serverless-endpoint/updateUsers', {
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
            await fetch('https://your-serverless-endpoint/updateSidebarLinks', {
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
            await fetch('https://your-serverless-endpoint/updateFormFields', {
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
                return (
                    <RoleManagementForm
                        users={users}
                        onSaveUser={handleSaveUser}
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
                    className={`px-4 py-2 rounded ${activeSection === 'roleManagement' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveSection('roleManagement')}
                >
                    Role Management
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeSection === 'sidebar' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveSection('sidebar')}
                >
                    Sidebar Management
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeSection === 'formFields' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
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