import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';  // Generate unique IDs
import PropertyForm from './PropertyForm';  // Import the property form

const ClientForm = ({ onSubmit }) => {
    const [clientData, setClientData] = useState({
        clientId: uuidv4(),  // Generate a unique ID for the client
        name: '',
        phoneNumber: '',
        clientType: 'Seller',  // Default to Seller (triggers property form by default)
        source: 'Facebook',
        preferredContact: 'Phone',
    });

    const [propertyData, setPropertyData] = useState({
        propertyId: uuidv4(),  // Generate a unique ID for the property
        title: '',
        type: 'Residential',
        category: 'For Sale',
        price: '',
        location: '',
        status: 'Available',
        floorArea: '',
        bedrooms: '',
        bathrooms: '',
        yearBuilt: '',
        amenities: '',
        media: [],
        description: '',
    });

    const [showPropertyForm, setShowPropertyForm] = useState(true);  // Default to show property form for Owner types

    // Handle client form changes
    const handleClientChange = (e) => {
        const { name, value } = e.target;
        setClientData({ ...clientData, [name]: value });

        // Show property form only for Owners (Seller, Renter)
        if (name === 'clientType') {
            setShowPropertyForm(value === 'Seller' || value === 'Renter');
        }
    };

    // Handle property form changes
    const handlePropertyChange = (e) => {
        const { name, value } = e.target;
        setPropertyData({ ...propertyData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const combinedData = {
            ...clientData,
            property: showPropertyForm ? { ...propertyData, ownerId: clientData.clientId } : null,  // Include owner ID
        };

        onSubmit(combinedData);  // Submit combined client and property data

        // Clear the forms
        setClientData({
            clientId: uuidv4(),
            name: '',
            phoneNumber: '',
            clientType: 'Seller',
            source: 'Facebook',
            preferredContact: 'Phone',
        });

        setPropertyData({
            propertyId: uuidv4(),
            title: '',
            type: 'Residential',
            category: 'For Sale',
            price: '',
            location: '',
            status: 'Available',
            floorArea: '',
            bedrooms: '',
            bathrooms: '',
            yearBuilt: '',
            amenities: '',
            media: [],
            description: '',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Add New Client</h2>

            <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                    type="text"
                    name="name"
                    value={clientData.name}
                    onChange={handleClientChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Phone Number</label>
                <input
                    type="text"
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
                    <option value="Seller">Seller (Owner)</option>
                    <option value="Renter">Renter (Owner)</option>
                    <option value="Buyer">Buyer (Property Seeker)</option>
                    <option value="Tenant">Tenant (Property Seeker)</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Source of Client</label>
                <select
                    name="source"
                    value={clientData.source}
                    onChange={handleClientChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="Facebook">Facebook</option>
                    <option value="Agent">Agent</option>
                    <option value="Business Card">Business Card</option>
                    <option value="Collaborators">Collaborators</option>
                    <option value="Phone Calls">Phone Calls</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Preferred Contact</label>
                <select
                    name="preferredContact"
                    value={clientData.preferredContact}
                    onChange={handleClientChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="Phone">Phone</option>
                    <option value="WhatsApp">WhatsApp</option>
                </select>
            </div>

            {/* Property Form Section (conditionally rendered) */}
            {showPropertyForm && (
                <div className="mt-6">
                    <h3 className="text-xl font-bold mb-2">Property Details</h3>
                    <div className="mb-4">
                        <label className="block text-gray-700">Title/Name</label>
                        <input
                            type="text"
                            name="title"
                            value={propertyData.title}
                            onChange={handlePropertyChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Type</label>
                        <select
                            name="type"
                            value={propertyData.type}
                            onChange={handlePropertyChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="Residential">Residential</option>
                            <option value="Commercial">Commercial</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={propertyData.price}
                            onChange={handlePropertyChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    {/* Add other property fields as needed */}
                </div>
            )}

            <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
                Submit Client and Property
            </button>
        </form>
    );
};

export default ClientForm;
