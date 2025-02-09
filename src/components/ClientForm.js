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

            {/* Other form fields... */}
            <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                Submit Client
            </button>
        </form>
    );
};

export default ClientForm;