import React, { useState } from 'react';
import RoleManagementForm from '../components/RoleManagementForm';

const Settings = ({ userRole }) => {
    const [users, setUsers] = useState(
        JSON.parse(localStorage.getItem('userManagement')) || []  // Initial state from storage
    );

    const handleSaveUser = (newUser) => {
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        localStorage.setItem('userManagement', JSON.stringify(updatedUsers));  // Persist changes
    };

    const handleDeleteUser = (userId) => {
        const filteredUsers = users.filter((user) => user.id !== userId);
        setUsers(filteredUsers);
        localStorage.setItem('userManagement', JSON.stringify(filteredUsers));
    };

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6">Settings - User & Role Management</h1>

            {/* Role Management Form */}
            <RoleManagementForm onSaveUser={handleSaveUser} />

            <h2 className="text-2xl font-semibold mt-8 mb-4">Current Users</h2>
            <ul>
                {users.length === 0 ? (
                    <p>No users added yet.</p>
                ) : (
                    users.map((user) => (
                        <li key={user.id} className="border p-4 rounded mb-2 flex justify-between">
                            <div>
                                <p><strong>ID:</strong> {user.id}</p>
                                <p><strong>Name:</strong> {user.name}</p>
                                <p><strong>Role:</strong> {user.role}</p>
                            </div>
                            <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="bg-red-500 text-white p-2 rounded"
                            >
                                Delete
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default Settings;