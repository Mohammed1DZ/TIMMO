import React, { useState } from 'react';
import PropertyForm from './PropertyForm';

const ClientForm = ({ onSubmitClient, onSubmitProperty }) => {
    const [clientData, setClientData] = useState({
        id: '',
        name: '',
        type: 'Buyer',
        contactInfo: '',
        source: 'Facebook',
    });

    const [propertyData, setPropertyData] = useState(null);
    const [showPropertyForm, setShowPropertyForm] = useState(false);

    const handleClientChange = (e) => {
        const { name, value } = e.target;
        setClientData({ ...clientData, [name]: value });

        // Show property form based on client type
        if (name === 'type') {
            const ownerTypes = ['Seller', 'Renter (Owner)', 'Landlord'];
            setShowPropertyForm(ownerTypes.includes(value));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Submit the client
        onSubmitClient(clientData);

        // Submit property if client is an owner
        if (showPropertyForm && propertyData) {
            onSubmitProperty({
                ...propertyData,
                owner: clientData.name,  // Link property to client
            });
        }

        // Reset forms
        setClientData({
            id: '',
            name: '',
            type: 'Buyer',
            contactInfo: '',
            source: 'Facebook',
        });
        setShowPropertyForm(false);
        setPropertyData(null);
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 border rounded shadow-md bg-white">
            <h2 className="text-2xl font-bold mb-4">Add New Client</h2>

            {/* Client Fields */}
            <div className="mb-4">
                <label className="block font-semibold mb-2">Client ID</label>
                <input
                    type="text"
                    name="id"
                    value={clientData.id}
                    onChange={handleClientChange}
                    className="w-full p-2 border rounded"
                    placeholder="Unique ID"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-2">Client Name</label>
                <input
                    type="text"
                    name="name"
                    value={clientData.name}
                    onChange={handleClientChange}
                    className="w-full p-2 border rounded"
                    placeholder="Enter Client Name"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-2">Client Type</label>
                <select
                    name="type"
                    value={clientData.type}
                    onChange={handleClientChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="Buyer">Buyer</option>
                    <option value="Renter (Looking)">Renter (Looking for Rent)</option>
                    <option value="Renter (Owner)">Renter (Owner of Property)</option>
                    <option value="Seller">Seller</option>
                    <option value="Landlord">Landlord</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-2">Contact Information</label>
                <input
                    type="text"
                    name="contactInfo"
                    value={clientData.contactInfo}
                    onChange={handleClientChange}
                    className="w-full p-2 border rounded"
                    placeholder="Phone or Email"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-2">Source of Information</label>
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
                    <option value="Phone Calls">Phone Calls</option>
                </select>
            </div>

            {/* Conditionally show the property form */}
            {showPropertyForm && (
                <div className="p-4 border rounded bg-gray-50 mt-4">
                    <h3 className="text-lg font-bold mb-4">Property Details</h3>
                    <PropertyForm
                        onSubmit={(property) => setPropertyData(property)}
                    />
                </div>
            )}

            {/* Single Submit Button */}
            <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4"
            >
                Submit Client and Property
            </button>
        </form>
    );
};

export default ClientForm;