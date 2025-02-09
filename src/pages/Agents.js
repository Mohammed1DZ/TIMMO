import React, { useState } from 'react';
import AgentForm from '../components/AgentForm';

const Agents = () => {
    const [agents, setAgents] = useState([]);

    const addAgent = (newAgent) => {
        setAgents((prevAgents) => [...prevAgents, newAgent]);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Manage Agents</h1>

            {/* Agent Form */}
            <AgentForm onSubmit={addAgent} />

            {/* Agent List */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Agent List</h2>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    {agents.length === 0 ? (
                        <p className="text-gray-500">No agents added yet.</p>
                    ) : (
                        <ul>
                            {agents.map((agent, index) => (
                                <li key={agent.agentId} className="p-2 border-b">
                                    <strong>{index + 1}. {agent.agentName}</strong> — {agent.phoneNumber}  
                                    <span className="block text-sm text-gray-600">
                                        {agent.typeOfAgent} Agent | {agent.region}
                                    </span>
                                    <span className="block text-sm">
                                        {agent.activeStatus ? "Active" : "Inactive"}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Agents;