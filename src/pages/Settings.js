import React, { useState, useEffect } from 'react';
import RoleManagementForm from '../components/RoleManagementForm';
import SidebarLinkManagement from '../components/SidebarLinkManagement';
import FormFieldManagement from '../components/FormFieldManagement';

const Settings = ({ userRole }) => {
    const [activeSection, setActiveSection] = useState('roleManagement');
    const [users, setUsers] = useState([]);
    const [sidebarLinks, setSidebarLinks] = useState([]);
    const [formFields, setFormFields] = useState([]);
    const [buttons, setButtons] = useState({});

    // Fetch data from the backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await fetch('https://timmodashboard.netlify.app/.netlify/functions/getUsers');
                const sidebarResponse = await fetch('https://timmodashboard.netlify.app/.netlify/functions/getSidebarLinks');
                const formFieldResponse = await fetch('https://timmodashboard.netlify.app/.netlify/functions/getFormFields');
                const buttonResponse = await fetch('https://timmodashboard.netlify.app/.netlify/functions/getButtonPermissions');

                const usersData = await userResponse.json();
                const sidebarData = await sidebarResponse.json();
                const formFieldsData = await formFieldResponse.json();
                const buttonData = await buttonResponse.json();

                setUsers(usersData);
                setSidebarLinks(sidebarData.links);
                setFormFields(formFieldsData.fields);
                setButtons(buttonData.buttons);
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

    const handleButtonUpdate = async (updatedButtons) => {
        try {
            await fetch('https://timmodashboard.netlify.app/.netlify/functions/updateButtonPermissions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedButtons)
            });
            setButtons(updatedButtons);
        } catch (error) {
            console.error('Error updating button permissions:', error);
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
            case 'buttons':
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Manage Button Permissions</h2>
                        {Object.keys(buttons).map((btn) => (
                            <div key={btn} className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    checked={buttons[btn]}
                                    onChange={() =>
                                        setButtons((prev) => ({
                                            ...prev,
                                            [btn]: !prev[btn],
                                        }))
                                    }
                                    id={btn}
                                />
                                <label htmlFor={btn} className="ml-2 capitalize">
                                    {btn.replace(/([A-Z])/g, ' $1')}
                                </label>
                            </div>
                        ))}
                        <button onClick={() => handleButtonUpdate(buttons)} className="bg-blue-500 text-white p-2 rounded">
                            Save Button Permissions
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6">Settings - Manage Users, Sidebar, Forms & Buttons</h1>
            
            {/* Section Tabs */}
            <div className="flex gap-4 mb-6">
                <button onClick={() => setActiveSection('roleManagement')} className={activeSection === 'roleManagement' ? 'bg-blue-500 text-white' : 'bg-gray-200'}>
                    Role Management
                </button>
                <button onClick={() => setActiveSection('sidebar')} className={activeSection === 'sidebar' ? 'bg-blue-500 text-white' : 'bg-gray-200'}>
                    Sidebar Management
                </button>
                <button onClick={() => setActiveSection('formFields')} className={activeSection === 'formFields' ? 'bg-blue-500 text-white' : 'bg-gray-200'}>
                    Form Field Management
                </button>
                <button onClick={() => setActiveSection('buttons')} className={activeSection === 'buttons' ? 'bg-blue-500 text-white' : 'bg-gray-200'}>
                    Button Management
                </button>
            </div>

            {/* Dynamic Content */}
            <div>{renderSection()}</div>
        </div>
    );
};

export default Settings;
