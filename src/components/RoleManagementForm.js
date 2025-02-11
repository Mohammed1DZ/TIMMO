import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';  // For generating unique IDs

const RoleManagementForm = ({ users, onSaveUser, onEditUser, onDeleteUser, currentUserRole }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Agent');  // Default role
    const [permissions, setPermissions] = useState({
        sidebarLinks: {
            dashboard: false,
            properties: false,
            clients: false,
            agents: false,
            settings: false,
        },
        buttons: {
            addUser: false,
            deleteUser: false,
            addProperty: false,
            deleteProperty: false,
        },
        forms: {
            clientForm: false,
            agentForm: false,
            propertyForm: false,
            settingsForm: false,
        }
    });
    const [error, setError] = useState('');

    useEffect(() => {
        setError('');  // Clear error on input change
    }, [name, email, password, role]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation checks
        if (!name || !email || !password) {
            setError('All fields are required.');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email.');
            return;
        }

        // Restrict adding Super Admin if not Super Admin
        if (role === 'Super Admin' && currentUserRole !== 'Super Admin') {
            setError('Only Super Admins can add other Super Admins.');
            return;
        }

        const newUser = {
            id: uuidv4(),
            name,
            email,
            password,
            role,
            permissions
        };

        onSaveUser(newUser);

        // Reset form
        setName('');
        setEmail('');
        setPassword('');
        setRole('Agent');
        setPermissions({
            sidebarLinks: {
                dashboard: false,
                properties: false,
                clients: false,
                agents: false,
                settings: false,
            },
            buttons: {
                addUser: false,
                deleteUser: false,
                addProperty: false,
                deleteProperty: false,
            },
            forms: {
                clientForm: false,
                agentForm: false,
                propertyForm: false,
                settingsForm: false,
            }
        });
    };

    const handlePermissionChange = (category, key) => {
        setPermissions((prev) => ({
            ...prev,
            [category]: {
                ...prev[category],
                [key]: !prev[category][key]
            }
        }));
    };

    return (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Add or Manage Users</h2>

            {/* Display errors */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* User Form */}
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        <option value="Super Admin">Super Admin</option>
                        <option value="Admin">Admin</option>
                        <option value="Agent">Agent</option>
                    </select>
                </div>

                {/* Permissions */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2">Set Access Permissions:</label>
                    
                    {/* Sidebar Links */}
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold">Sidebar Links</h3>
                        {Object.keys(permissions.sidebarLinks).map((link) => (
                            <div key={link} className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    checked={permissions.sidebarLinks[link]}
                                    onChange={() => handlePermissionChange('sidebarLinks', link)}
                                    id={link}
                                    className="mr-2"
                                />
                                <label htmlFor={link} className="capitalize">{link}</label>
                            </div>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold">Buttons</h3>
                        {Object.keys(permissions.buttons).map((button) => (
                            <div key={button} className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    checked={permissions.buttons[button]}
                                    onChange={() => handlePermissionChange('buttons', button)}
                                    id={button}
                                    className="mr-2"
                                />
                                <label htmlFor={button} className="capitalize">{button}</label>
                            </div>
                        ))}
                    </div>

                    {/* Forms */}
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold">Forms</h3>
                        {Object.keys(permissions.forms).map((form) => (
                            <div key={form} className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    checked={permissions.forms[form]}
                                    onChange={() => handlePermissionChange('forms', form)}
                                    id={form}
                                    className="mr-2"
                                />
                                <label htmlFor={form} className="capitalize">{form}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Add User
                </button>
            </form>

            {/* Existing Users List */}
            <h3 className="text-xl font-bold mb-4">Existing Users</h3>
            <ul className="divide-y divide-gray-300">
                {users.map((user) => (
                    <li key={user.id} className="py-2 flex justify-between items-center">
                        <div>
                            <p className="font-medium">{user.name} ({user.role})</p>
                            <p className="text-gray-600 text-sm">{user.email}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => onEditUser(user.id)}
                                className="bg-green-500 text-white p-2 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDeleteUser(user.id)}
                                className="bg-red-500 text-white p-2 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoleManagementForm;