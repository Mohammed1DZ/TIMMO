import React, { useState } from 'react';

const ClientForm = ({ onSubmitClient, onSubmitProperty }) => {
    const [clientData, setClientData] = useState({
        clientId: '',
        clientName: '',
        clientType: 'Buyer',
        phoneNumber: '',
        source: '',
    });

    const [isOwner, setIsOwner] = useState(false);
    const [propertyData, setPropertyData] = useState({
        propertyId: '',
        propertyType: '',
        location: '',
        price: '',
        status: 'Available',
    });

    const handleClientChange = (e) => {
        const { name, value } = e.target;
        setClientData({ ...clientData, [name]: value });

        if (name === 'clientType') {
            setIsOwner(value === 'Seller' || value === 'Landlord' || value === 'Renter-Owner');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitClient(clientData);

        if (isOwner) {
            onSubmitProperty(propertyData);
        }

        setClientData({
            clientId: '',
            clientName: '',
            clientType: 'Buyer',
            phoneNumber: '',
            source: '',
        });
        setPropertyData({
            propertyId: '',
            propertyType: '',
            location: '',
            price: '',
            status: 'Available',
        });
        setIsOwner(false);
        alert('Client added successfully!');
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Add New Client</h2>

            <div className="mb-4">
                <label className="block text-gray-700">Client Name</label>
                <input
                    type="text"
                    name="clientName"
                    value={clientData.clientName}
                    onChange={handleClientChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Phone Number</label>
                <input
                    type="tel"
                    name="phoneNumber"
                    value={clientData.phoneNumber}
                    onChange={handleClientChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Client Type</label>
                <select
                    name="clientType"
                    value={clientData.clientType}
                    onChange={handleClientChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="Buyer">Buyer</option>
                    <option value="Renter">Renter</option>
                    <option value="Seller">Seller</option>
                    <option value="Landlord">Landlord</option>
                    <option value="Renter-Owner">Renter-Owner</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Source</label>
                <select
                    name="source"
                    value={clientData.source}
                    onChange={handleClientChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="Facebook">Facebook</option>
                    <option value="Agent">Agent</option>
                    <option value="Collaborators">Collaborators</option>
                    <option value="Business Card">Business Card</option>
                    <option value="Phone Call">Phone Call</option>
                </select>
            </div>

            {isOwner && (
                <>
                    <h3 className="text-xl font-bold mt-6 mb-4">Property Details</h3>

                    <div className="mb-4">
                        <label className="block text-gray-700">Property Type</label>
                        <input
                            type="text"
                            name="propertyType"
                            value={propertyData.propertyType}
                            onChange={handleClientChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={propertyData.location}
                            onChange={handleClientChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                </>
            )}

            <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                Submit Client
            </button>
        </form>
    );
};

export default ClientForm;