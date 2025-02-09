import React, { useState } from 'react';
import ClientForm from '../components/ClientForm';

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [showFormModal, setShowFormModal] = useState(false);

    const addClient = (newClient) => {
        setClients((prevClients) => [...prevClients, newClient]);
        setShowFormModal(false);  // Close the form modal after submission
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Manage Clients</h1>

            {/* Add New Client Button */}
            <button
                onClick={() => setShowFormModal(true)}
                className="bg-blue-500 text-white p-2 rounded mb-4"
            >
                Add New Client
            </button>

            {/* Client List */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Client List</h2>
                {clients.length === 0 ? (
                    <p>No clients added yet.</p>
                ) : (
                    <ul className="space-y-4">
                        {clients.map((client, index) => (
                            <li key={index} className="p-4 border rounded bg-gray-100">
                                <p><strong>ID:</strong> {client.clientId}</p>
                                <p><strong>Name:</strong> {client.clientName}</p>
                                <p><strong>Type:</strong> {client.clientType}</p>
                                <p><strong>Contact:</strong> {client.phoneNumber}</p>
                                <p><strong>Source:</strong> {client.source}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Client Form Modal */}
            {showFormModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md relative">
                        <button
                            onClick={() => setShowFormModal(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-black"
                        >
                            X
                        </button>
                        <ClientForm onSubmit={addClient} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Clients;