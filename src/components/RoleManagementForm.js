import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';  // For generating unique IDs

const RoleManagementForm = ({ onSaveUser }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Agent');  // Default role is Agent

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            id: uuidv4(),  // Unique ID for each user
            name,
            email,
            password,
            role,
        };
        onSaveUser(newUser);

        // Reset form
        setName('');
        setEmail('');
        setPassword('');
        setRole('Agent');
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Add New User</h2>

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

            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Add User
            </button>
        </form>
    );
};

export default RoleManagementForm;