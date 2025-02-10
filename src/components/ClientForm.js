import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';  // Generate unique IDs

const ClientForm = ({ onSubmit }) => {
    const [clientData, setClientData] = useState({
        clientId: uuidv4(),  // Auto-generated client ID
        name: '',
        phoneNumber: '',
        clientType: 'Seller',  // Default to Seller
        source: 'Facebook',
        preferredContact: 'Phone',
    });

    const [propertyData, setPropertyData] = useState({
        propertyId: uuidv4(),  // Auto-generated property ID
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

    const [showPropertyForm, setShowPropertyForm] = useState(true);  // Default to show for owners

    // Handle client form changes
    const handleClientChange = (e) => {
        const { name, value } = e.target;
        setClientData({ ...clientData, [name]: value });

        // Toggle property form visibility based on client type
        if (name === 'clientType') {
            setShowPropertyForm(value === 'Seller' || value === 'Renter');
        }
    };

    // Handle property form changes
    const handlePropertyChange = (e) => {
        const { name, value } = e.target;
        setPropertyData({ ...propertyData, [name]: value });
    };

    // Handle file input for media
    const handleMediaChange = (e) => {
        setPropertyData({ ...propertyData, media: Array.from(e.target.files) });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const combinedData = {
            ...clientData,
            property: showPropertyForm ? { ...propertyData, ownerId: clientData.clientId } : null,  // Link client and property by ID
        };

        onSubmit(combinedData);

        // Reset forms after submission
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

            {/* Client Details */}
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

            {/* Property Form (conditionally rendered) */}
            {showPropertyForm && (
                <div className="mt-6">
                    <h3 className="text-xl font-bold mb-2">Property Details</h3>

                    <div className="mb-4">
                        <label className="block text-gray-700">Title</label>
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
                        <label className="block text-gray-700">Category</label>
                        <select
                            name="category"
                            value={propertyData.category}
                            onChange={handlePropertyChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="For Sale">For Sale</option>
                            <option value="For Rent">For Rent</option>
                            <option value="Both">Both</option>
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

                    <div className="mb-4">
                        <label className="block text-gray-700">Floor Area (m² or sq. ft)</label>
                        <input
                            type="number"
                            name="floorArea"
                            value={propertyData.floorArea}
                            onChange={handlePropertyChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Number of Bedrooms</label>
                        <input
                            type="number"
                            name="bedrooms"
                            value={propertyData.bedrooms}
                            onChange={handlePropertyChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Number of Bathrooms</label>
                        <input
                            type="number"
                            name="bathrooms"
                            value={propertyData.bathrooms}
                            onChange={handlePropertyChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Year Built or Renovated</label>
                        <input
                            type="number"
                            name="yearBuilt"
                            value={propertyData.yearBuilt}
                            onChange={handlePropertyChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Amenities</label>
                        <input
                            type="text"
                            name="amenities"
                            value={propertyData.amenities}
                            onChange={handlePropertyChange}
                            className="w-full p-2 border rounded"
                            placeholder="E.g., Pool, Gym, Parking"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Media (Images/Videos)</label>
                        <input
                            type="file"
                            name="media"
                            accept="image/*,video/*"
                            multiple
                            onChange={handleMediaChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={propertyData.description}
                            onChange={handlePropertyChange}
                            className="w-full p-2 border rounded"
                            rows="4"
                        />
                    </div>
                </div>
            )}

            <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
                Submit Client and Property
            </button>
        </form>
    );
};

export default ClientForm;