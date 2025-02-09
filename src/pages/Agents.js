import React from 'react';
import AgentForm from '../components/AgentForm';

const Agents = () => {
    const handleAddAgent = (newAgent) => {
        console.log('Agent added:', newAgent);
        // You can update the agent list state here
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Agents Management</h1>

            {/* Embedded Form */}
            <AgentForm onSubmit={handleAddAgent} />

            {/* Future: Add a list of agents here */}
        </div>
    );
};

export default Agents;