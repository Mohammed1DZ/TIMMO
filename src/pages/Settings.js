import React, { useState } from 'react';
import RoleManagementForm from '../components/RoleManagementForm';
import VisibilitySettings from '../components/VisibilitySettings';
import FormFieldManagement from '../components/FormFieldManagement';
import SidebarLinkManagement from '../components/SidebarLinkManagement';  

const Settings = ({ userRole }) => {
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('userManagement')) || []);
    const [sidebarLinks, setSidebarLinks] = useState(JSON.parse(localStorage.getItem('dynamicSidebarLinks')) || []);
    const [formFields, setFormFields] = useState(JSON.parse(localStorage.getItem('dynamicFormFields')) || []);

    // Add new user and save role-based visibility permissions
    const handleSaveUser = (newUser) => {
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        localStorage.setItem('userManagement', JSON.stringify(updatedUsers));
    };

    // Edit user permissions (existing user)
    const handleEditUser = (userId, updatedPermissions) => {
        const updatedUsers = users.map((user) =>
            user.id === userId ? { ...user, permissions: updatedPermissions } : user
        );
        setUsers(updatedUsers);
        localStorage.setItem('userManagement', JSON.stringify(updatedUsers));
    };

    // Delete a user
    const handleDeleteUser = (userId) => {
        const filteredUsers = users.filter((user) => user.id !== userId);
        setUsers(filteredUsers);
        localStorage.setItem('userManagement', JSON.stringify(filteredUsers));
    };

    // Sidebar management (add/edit/remove links)
    const handleSidebarUpdate = (updatedLinks) => {
        setSidebarLinks(updatedLinks);
        localStorage.setItem('dynamicSidebarLinks', JSON.stringify(updatedLinks));
    };

    // Form field management (add/edit/remove form fields)
    const handleFormFieldUpdate = (updatedFields) => {
        setFormFields(updatedFields);
        localStorage.setItem('dynamicFormFields', JSON.stringify(updatedFields));
    };

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6">Settings - Manage Users, Sidebar, and Forms</h1>

            {/* Role Management Section */}
            <RoleManagementForm
                users={users}
                onSaveUser={handleSaveUser}
                onEditUser={handleEditUser}
                onDeleteUser={handleDeleteUser}
            />

            {/* Sidebar Management Section */}
            <h2 className="text-2xl font-semibold mt-8">Sidebar Link Management</h2>
            <SidebarLinkManager sidebarLinks={sidebarLinks} onSidebarUpdate={handleSidebarUpdate} />

            {/* Form Field Management Section */}
            <h2 className="text-2xl font-semibold mt-8">Form Field Management</h2>
            <FormFieldManager formFields={formFields} onFormFieldUpdate={handleFormFieldUpdate} />
        </div>
    );
};

export default Settings;