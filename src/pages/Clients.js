import React, { useState } from 'react';
import ClientForm from '../components/ClientForm';

const Clients = () => {
    const [clients, setClients] = useState([]);

    // Dummy properties (replace this with actual property data)
    const availableProperties = [
        { id: 'P1', title: 'Modern Apartment', location: 'Downtown' },
        { id: 'P2', title: 'Luxury Villa', location: 'Seaside' },
        { id: 'P3', title: 'Office Space', location: 'Business District' },
    ];

    const handleAddClient = (newClient) => {
        setClients([...clients, newClient]);
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Clients Management</h1>

            {/* Form Section */}
            <div className="mb-8">
                <ClientForm onSubmit={handleAddClient} availableProperties={availableProperties} />
            </div>

            {/* List of Clients */}
            <div>
                <h2 className="text-2xl font-semibold mb-4">Listed Clients</h2>
                {clients.length === 0 ? (
                    <p>No clients added yet.</p>
                ) : (
                    <ul className="space-y-4">
                        {clients.map((client, index) => (
                            <li key={index} className="p-4 border rounded bg-gray-100">
                                <p><strong>ID:</strong> {client.id}</p>
                                <p><strong>Name:</strong> {client.name}</p>
                                <p><strong>Type:</strong> {client.type}</p>
                                <p><strong>Contact:</strong> {client.contactInfo}</p>
                                <p><strong>Source:</strong> {client.source}</p>
                                <p><strong>Related Property:</strong> {client.propertyId ? client.propertyId : 'None'}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Clients;