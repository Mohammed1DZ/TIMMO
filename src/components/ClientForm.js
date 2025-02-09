import React, { useState } from 'react';
import PropertyForm from './PropertyForm';

const ClientForm = ({ addClient }) => {
    const [clientData, setClientData] = useState({
        clientId: '',
        clientName: '',
        clientType: 'Buyer',
        phoneNumber: '',
        source: 'Facebook',
        preferredContact: '',
        address: '',
        budget: '',
        notes: '',
    });

    const [isOwner, setIsOwner] = useState(false);
    const [propertyData, setPropertyData] = useState(null);

    const handleClientChange = (e) => {
        const { name, value } = e.target;
        setClientData({ ...clientData, [name]: value });

        if (name === 'clientType') {
            setIsOwner(value === 'Landlord' || value === 'Renter-Owner');
        }
    };

    const handlePropertySubmit = (property) => {
        setPropertyData(property);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addClient({ ...clientData, property: propertyData });
        setClientData({
            clientId: '',
            clientName: '',
            clientType: 'Buyer',
            phoneNumber: '',
            source: 'Facebook',
            preferredContact: '',
            address: '',
            budget: '',
            notes: '',
        });
        setPropertyData(null);
        alert('Client and property added successfully!');
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
                <label className="block text-gray-700">Client Type</label>
                <select
                    name="clientType"
                    value={clientData.clientType}
                    onChange={handleClientChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="Renter (Owner of Property)">Renter (Owner)</option>
                    <option value="Seller">Seller</option>
                    <option value="Buyer">Buyer</option>
                    <option value="Renter (Looking for Property)">Renter (Seeker)</option>
<option value="Landlord">Landlord</option>  {/* Considered an owner */}
                </select>
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
                <label className="block text-gray-700">Source of Information</label>
                <select
                    name="source"
                    value={clientData.source}
                    onChange={handleClientChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="Facebook">Facebook</option>
                    <option value="Agent">Agent</option>
                    <option value="Business Card">Business Card</option>
                    <option value="Phone Call">Phone Call</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Notes</label>
                <textarea
                    name="notes"
                    value={clientData.notes}
                    onChange={handleClientChange}
                    className="w-full p-2 border rounded"
                />
            </div>

            {/* Conditional Rendering of Property Form */}
            {isOwner && (
                <div className="mt-6">
                    <h3 className="text-xl font-bold mb-2">Property Details (For Owners)</h3>
                    <PropertyForm onSubmit={handlePropertySubmit} />
                </div>
            )}

            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Submit Client {isOwner && 'and Property'}
            </button>
        </form>
    );
};

export default ClientForm;
