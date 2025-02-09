import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AgentForm = ({ onSubmit }) => {
    const [agentData, setAgentData] = useState({
        agentId: uuidv4(),  // Auto-generate unique ID
        agentName: '',
        phoneNumber: '',
        email: '',
        typeOfAgent: 'Inside',  // Default value
        yearsOfExperience: '',
        region: '',
        activeStatus: true,
        notes: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setAgentData({
            ...agentData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(agentData);

        // Clear form after submission
        setAgentData({
            agentId: uuidv4(),
            agentName: '',
            phoneNumber: '',
            email: '',
            typeOfAgent: 'Inside',
            yearsOfExperience: '',
            region: '',
            activeStatus: true,
            notes: '',
        });

        alert('Agent added successfully!');
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Add New Agent</h2>

            <div className="mb-4">
                <label className="block text-gray-700">Agent Name</label>
                <input
                    type="text"
                    name="agentName"
                    value={agentData.agentName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Phone Number</label>
                <input
                    type="tel"
                    name="phoneNumber"
                    value={agentData.phoneNumber}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Email (Optional)</label>
                <input
                    type="email"
                    name="email"
                    value={agentData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Type of Agent</label>
                <select
                    name="typeOfAgent"
                    value={agentData.typeOfAgent}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="Inside">Inside</option>
                    <option value="Field">Field</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Years of Experience</label>
                <input
                    type="number"
                    name="yearsOfExperience"
                    value={agentData.yearsOfExperience}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Region Covered</label>
                <input
                    type="text"
                    name="region"
                    value={agentData.region}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Active Status</label>
                <input
                    type="checkbox"
                    name="activeStatus"
                    checked={agentData.activeStatus}
                    onChange={handleChange}
                    className="ml-2"
                />{' '}
                Active
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Notes</label>
                <textarea
                    name="notes"
                    value={agentData.notes}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    rows="4"
                />
            </div>

            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Submit Agent
            </button>
        </form>
    );
};

export default AgentForm;