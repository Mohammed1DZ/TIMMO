import React, { useState } from 'react';
import PropertyForm from './PropertyForm'; // Import PropertyForm
import { v4 as uuidv4 } from 'uuid';

const ClientForm = () => {
    // State for client form
    const [clientData, setClientData] = useState({
        clientId: '',
        clientName: '',
        clientType: 'Renter (Looking for Property)',  // Default value
        contactInfo: '',
        sourceInfo: '',
    });

    // State for property form (only shown if client is an owner)
    const [propertyData, setPropertyData] = useState({
        propertyId: '',
        title: '',
        type: 'Residential',
        category: 'For Sale',
        price: '',
        location: '',
        status: 'Available',
        media: [],
    });

    const [isOwner, setIsOwner] = useState(false);  // To toggle property form

    const handleClientChange = (e) => {
        setClientData({
            ...clientData,
            [e.target.name]: e.target.value,
        });
    };

    const handlePropertyChange = (e) => {
        setPropertyData({
            ...propertyData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Add client and property to lists (mock, you can later replace with an API call)
        const client = {
            ...clientData,
            clientId: uuidv4(),  // Generate unique ID for client
        };

        const property = {
            ...propertyData,
            propertyId: uuidv4(),  // Generate unique ID for property
            clientId: client.clientId,  // Link property to client
        };

        console.log('Client added:', client);
        console.log('Property added:', property);

        // Clear the forms after submit
        setClientData({
            clientId: '',
            clientName: '',
            clientType: 'Renter (Looking for Property)',
            contactInfo: '',
            sourceInfo: '',
        });
        setPropertyData({
            propertyId: '',
            title: '',
            type: 'Residential',
            category: 'For Sale',
            price: '',
            location: '',
            status: 'Available',
            media: [],
        });
    };

    const toggleOwner = () => {
        // Toggle client type to owner/renter and show property form when the client is an owner
        setIsOwner(clientData.clientType === 'Owner');
    };

    return (
        <div>
            <h1>Clients Management</h1>
            <form onSubmit={handleSubmit}>
                {/* Client Details */}
                <label>
                    Client ID:
                    <input
                        type="text"
                        name="clientId"
                        value={clientData.clientId}
                        onChange={handleClientChange}
                        required
                    />
                </label>
                <label>
                    Client Name:
                    <input
                        type="text"
                        name="clientName"
                        value={clientData.clientName}
                        onChange={handleClientChange}
                        required
                    />
                </label>
                <label>
                    Client Type:
                    <select
                        name="clientType"
                        value={clientData.clientType}
                        onChange={handleClientChange}
                        onBlur={toggleOwner}  // Toggle property form on client type change
                    >
                        <option value="Renter (Looking for Property)">Renter (Looking for Property)</option>
                        <option value="Owner">Owner</option>
                    </select>
                </label>
                <label>
                    Contact Information:
                    <input
                        type="text"
                        name="contactInfo"
                        value={clientData.contactInfo}
                        onChange={handleClientChange}
                        required
                    />
                </label>
                <label>
                    Source of Information:
                    <input
                        type="text"
                        name="sourceInfo"
                        value={clientData.sourceInfo}
                        onChange={handleClientChange}
                        required
                    />
                </label>

                {/* Property Form (conditionally rendered for owners) */}
                {isOwner && (
                    <div>
                        <PropertyForm
                            propertyData={propertyData}
                            handlePropertyChange={handlePropertyChange}
                        />
                    </div>
                )}

                {/* Submit button for both Client and Property */}
                <button type="submit">Submit Client and Property</button>
            </form>
        </div>
    );
};

export default ClientForm;