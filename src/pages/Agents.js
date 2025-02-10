import React, { useState } from 'react';
import AgentForm from '../components/AgentForm';
import AgentDetailsModal from '../components/AgentDetailsModal';

const Agents = () => {
    const [agents, setAgents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Function to add a new agent
    const handleAddAgent = (newAgent) => {
        setAgents([...agents, newAgent]);
        setShowForm(false);
    };

    // Function to save the edited agent
    const handleSaveEditedAgent = (updatedAgent) => {
        setAgents(agents.map((agent) =>
            agent.agentId === updatedAgent.agentId ? updatedAgent : agent
        ));
        setShowForm(false);
        setIsEditing(false);
        setSelectedAgent(null);
    };

    // Function to handle agent click for popup details
    const handleAgentClick = (agent) => {
        setSelectedAgent(agent);
    };

    // Function to close the agent details popup
    const handleCloseModal = () => {
        setSelectedAgent(null);
    };

    // Function to start editing from the modal
    const handleEditFromModal = () => {
        setIsEditing(true);
        setShowForm(true);
    };

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6">Agents Management</h1>

            <button
                onClick={() => {
                    setShowForm(!showForm);
                    setIsEditing(false);
                    setSelectedAgent(null);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
            >
                {showForm ? 'Hide Form' : 'Add New Agent'}
            </button>

            {/* Show the form for adding or editing */}
            {showForm && (
                <AgentForm
                    onSubmit={isEditing ? handleSaveEditedAgent : handleAddAgent}
                    agent={selectedAgent}
                    isEditing={isEditing}
                />
            )}

            <h2 className="text-2xl font-bold mt-6">Listed Agents</h2>
            <ul className="mt-4 space-y-4">
                {agents.length === 0 ? (
                    <p>No agents listed yet.</p>
                ) : (
                    agents.map((agent, index) => (
                        <li
                            key={index}
                            className="border p-4 rounded shadow cursor-pointer hover:bg-gray-100 flex items-center space-x-4"
                            onClick={() => handleAgentClick(agent)}  // Open agent details
                        >
                            {agent.profilePicture && (
                                <img
                                    src={URL.createObjectURL(agent.profilePicture)}
                                    alt={`${agent.agentName}'s Profile`}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                            )}
                            <div>
                                <h3 className="text-xl font-bold">{agent.agentName}</h3>
                                <p><strong>Phone:</strong> {agent.phoneNumber}</p>
                                <p><strong>Email:</strong> {agent.email || 'N/A'}</p>
                                <p><strong>Type:</strong> {agent.typeOfAgent}</p>
                            </div>
                        </li>
                    ))
                )}
            </ul>

            {selectedAgent && (
                <AgentDetailsModal
                    agent={selectedAgent}
                    onClose={handleCloseModal}
                    onEdit={handleEditFromModal}  // Handle edit from the modal
                />
            )}
        </div>
    );
};

export default Agents;
