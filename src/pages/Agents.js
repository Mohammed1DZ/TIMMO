import React, { useState } from 'react';
import AgentForm from '../components/AgentForm';
import AgentDetailModal from '../components/AgentDetailModal';

const Agents = () => {
    const [agents, setAgents] = useState([]);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [showFormModal, setShowFormModal] = useState(false);

    const addAgent = (newAgent) => {
        setAgents((prevAgents) => [...prevAgents, newAgent]);
        setShowFormModal(false);  // Close the form modal after submission
    };

    const handleEditAgent = (updatedAgent) => {
        setAgents((prevAgents) =>
            prevAgents.map((agent) => (agent.agentId === updatedAgent.agentId ? updatedAgent : agent))
        );
        setSelectedAgent(null);  // Close modal after editing
    };

    const handleDeleteAgent = (agentId) => {
        if (window.confirm('Are you sure you want to delete this agent?')) {
            setAgents((prevAgents) => prevAgents.filter((agent) => agent.agentId !== agentId));
            setSelectedAgent(null);  // Close modal after deletion
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Manage Agents</h1>

            {/* Add New Agent Button */}
            <button
                onClick={() => setShowFormModal(true)}
                className="bg-blue-500 text-white p-2 rounded mb-4"
            >
                Add New Agent
            </button>

            {/* Agent List */}
            <div className="mt-4">
                <h2 className="text-2xl font-bold mb-4">Agent List</h2>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    {agents.length === 0 ? (
                        <p className="text-gray-500">No agents added yet.</p>
                    ) : (
                        <ul>
                            {agents.map((agent) => (
                                <li
                                    key={agent.agentId}
                                    className="p-2 border-b cursor-pointer hover:bg-gray-200"
                                    onClick={() => setSelectedAgent(agent)}
                                >
                                    <strong>{agent.agentName}</strong> — {agent.phoneNumber}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Agent Form Modal */}
            {showFormModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md relative">
                        <button
                            onClick={() => setShowFormModal(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-black"
                        >
                            X
                        </button>
                        <AgentForm onSubmit={addAgent} />
                    </div>
                </div>
            )}

            {/* Agent Detail Modal */}
            {selectedAgent && (
                <AgentDetailModal
                    agent={selectedAgent}
                    onClose={() => setSelectedAgent(null)}
                    onEdit={handleEditAgent}
                    onDelete={handleDeleteAgent}
                />
            )}
        </div>
    );
};

export default Agents;