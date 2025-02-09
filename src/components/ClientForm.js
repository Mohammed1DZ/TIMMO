import React, { useState } from 'react';

const ClientForm = ({ onSubmitClient, onSubmitProperty }) => {
    const [clientData, setClientData] = useState({
        clientId: '',
        clientName: '',
        clientType: 'Buyer',  // Default to Buyer
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

    // Update client data on change
    const handleClientChange = (e) => {
        const { name, value } = e.target;
        setClientData({ ...clientData, [name]: value });

        // Include Sellers, Landlords, and Renter-Owners as owners
        if (name === 'clientType') {
            setIsOwner(value === 'Seller' || value === 'Landlord' || value === 'Renter-Owner');
        }
    };

    // Update property data on change
    const handlePropertyChange = (e) => {
        const { name, value } = e.target;
        setPropertyData({ ...propertyData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitClient(clientData);

        if (isOwner) {
            onSubmitProperty(propertyData);
        }

        // Reset forms
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
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full md:w-3/4 lg:w-1/2 mx-auto">
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
                    <option value="Seller">Seller</option>  {/* Considered owner now */}
                    <option value="Landlord">Landlord</option>  {/* Considered owner */}
                    <option value="Renter-Owner">Renter-Owner</option>  {/* Considered owner */}
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
                            onChange={handlePropertyChange}
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
                            onChange={handlePropertyChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={propertyData.price}
                            onChange={handlePropertyChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Status</label>
                        <select
                            name="status"
                            value={propertyData.status}
                            onChange={handlePropertyChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="Available">Available</option>
                            <option value="Sold">Sold</option>
                            <option value="Rented">Rented</option>
                        </select>
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