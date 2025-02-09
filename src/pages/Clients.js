import React, { useState } from 'react';
import ClientForm from '../components/ClientForm';

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [properties, setProperties] = useState([]);

    const handleAddClient = (newClient) => {
        setClients([...clients, newClient]);
    };

    const handleAddProperty = (newProperty) => {
        setProperties([...properties, newProperty]);
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Clients Management</h1>

            {/* Form Section */}
            <div className="mb-8">
                <ClientForm onSubmitClient={handleAddClient} onSubmitProperty={handleAddProperty} />
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
                                <p><strong>Is Owner:</strong> {client.isOwner ? 'Yes' : 'No'}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* List of Properties (For reference) */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Listed Properties</h2>
                {properties.length === 0 ? (
                    <p>No properties added yet.</p>
                ) : (
                    <ul className="space-y-4">
                        {properties.map((property, index) => (
                            <li key={index} className="p-4 border rounded bg-gray-100">
                                <p><strong>ID:</strong> {property.propertyId}</p>
                                <p><strong>Title:</strong> {property.title}</p>
                                <p><strong>Type:</strong> {property.type}</p>
                                <p><strong>Category:</strong> {property.category}</p>
                                <p><strong>Price:</strong> ${property.price}</p>
                                <p><strong>Location:</strong> {property.location}</p>
                                <p><strong>Status:</strong> {property.status}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Clients;