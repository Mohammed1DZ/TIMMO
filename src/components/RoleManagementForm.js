import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';  // For generating unique IDs

const RoleManagementForm = ({ currentUserRole }) => {
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
    const [users, setUsers] = useState([]);

    // Fetch users from the backend on component mount
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://your-serverless-endpoint/getUsers');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError('All fields are required.');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email.');
            return;
        }

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
            permissions,
        };

        try {
            const response = await fetch('https://your-serverless-endpoint/addOrUpdateUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                const updatedUsers = await response.json();
                setUsers(updatedUsers);  // Update the list after successful addition
                setError('');  // Clear errors
                resetForm();  // Reset the form
            } else {
                setError('Failed to add user. Please try again.');
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const resetForm = () => {
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

    const handleDeleteUser = async (userId) => {
        try {
            const response = await fetch('https://your-serverless-endpoint/removeUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId }),
            });

            if (response.ok) {
                const updatedUsers = await response.json();
                setUsers(updatedUsers);  // Update the list after successful deletion
            } else {
                console.error('Failed to delete user.');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handlePermissionChange = (category, key) => {
        setPermissions((prev) => ({
            ...prev,
            [category]: {
                ...prev[category],
                [key]: !prev[category][key],
            }
        }));
    };

    return (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Add or Manage Users</h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit}>
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

                <div className="mb-4">
                    <h3 className="font-semibold">Permissions</h3>
                    {Object.keys(permissions).map((category) => (
                        <div key={category}>
                            <h4 className="text-lg mt-4 capitalize">{category}</h4>
                            {Object.keys(permissions[category]).map((key) => (
                                <div key={key} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        checked={permissions[category][key]}
                                        onChange={() => handlePermissionChange(category, key)}
                                        id={`${category}-${key}`}
                                    />
                                    <label htmlFor={`${category}-${key}`} className="ml-2 capitalize">
                                        {key}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Add User
                </button>
            </form>

            <h3 className="text-xl font-bold mt-6">Existing Users</h3>
            <ul className="divide-y divide-gray-300">
                {users.map((user) => (
                    <li key={user.id} className="py-2 flex justify-between items-center">
                        <div>
                            <p className="font-medium">{user.name} ({user.role})</p>
                            <p className="text-gray-600 text-sm">{user.email}</p>
                        </div>
                        <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 text-white p-2 rounded">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoleManagementForm;