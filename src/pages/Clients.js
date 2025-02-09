import React from 'react';
import ClientForm from '../components/ClientForm';

const Clients = () => {
    const handleAddClient = (newClient) => {
        console.log('Client added:', newClient);
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Clients Management</h1>

            {/* Embedded Form */}
            <ClientForm onSubmitClient={handleAddClient} />

            {/* Future: List of clients */}
        </div>
    );
};

export default Clients;