import React, { useState } from 'react';

const ClientForm = ({ onSubmitClient, onSubmitProperty }) => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        type: 'Buyer',
        contactInfo: '',
        source: 'Facebook',
        isOwner: false,
        propertyDetails: {
            propertyId: '',
            title: '',
            type: 'Apartment',
            category: 'For Sale',
            price: '',
            location: '',
            status: 'Available',
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('propertyDetails.')) {
            const propertyField = name.split('.')[1];
            setFormData({
                ...formData,
                propertyDetails: {
                    ...formData.propertyDetails,
                    [propertyField]: value,
                },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleToggleOwner = () => {
        setFormData({ ...formData, isOwner: !formData.isOwner });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitClient(formData);

        // If the client is an owner, submit their property to the properties list
        if (formData.isOwner) {
            onSubmitProperty(formData.propertyDetails);
        }

        // Reset form
        setFormData({
            id: '',
            name: '',
            type: 'Buyer',
            contactInfo: '',
            source: 'Facebook',
            isOwner: false,
            propertyDetails: {
                propertyId: '',
                title: '',
                type: 'Apartment',
                category: 'For Sale',
                price: '',
                location: '',
                status: 'Available',
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 border rounded shadow-md bg-white">
            <h2 className="text-2xl font-bold mb-4">Add New Client</h2>
            
            {/* Client Info Fields */}
            <div className="mb-4">
                <label className="block font-semibold mb-2" htmlFor="id">Client ID</label>
                <input 
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Unique ID"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-2" htmlFor="name">Client Name</label>
                <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Enter Client Name"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-2" htmlFor="type">Client Type</label>
                <select 
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="Buyer">Buyer</option>
                    <option value="Renter">Renter</option>
                    <option value="Seller">Seller</option>
                    <option value="Landlord">Landlord</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-2" htmlFor="contactInfo">Contact Information</label>
                <input 
                    type="text"
                    name="contactInfo"
                    value={formData.contactInfo}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Phone or Email"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-2">Source of Information</label>
                <select 
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="Facebook">Facebook</option>
                    <option value="Agent">Agent</option>
                    <option value="Collaborators">Collaborators</option>
                    <option value="Business Card">Business Card</option>
                    <option value="Phone Calls">Phone Calls</option>
                </select>
            </div>

            {/* Property Owner Toggle */}
            <div className="mb-4">
                <label className="block font-semibold mb-2">
                    <input 
                        type="checkbox"
                        checked={formData.isOwner}
                        onChange={handleToggleOwner}
                        className="mr-2"
                    />
                    Is the Client a Property Owner?
                </label>
            </div>

            {/* Property Form (conditionally displayed) */}
            {formData.isOwner && (
                <div className="p-4 border rounded bg-gray-50">
                    <h3 className="text-lg font-bold mb-4">Property Details</h3>

                    <div className="mb-4">
                        <label className="block font-semibold mb-2" htmlFor="propertyId">Property ID</label>
                        <input 
                            type="text"
                            name="propertyDetails.propertyId"
                            value={formData.propertyDetails.propertyId}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Enter Property ID"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-semibold mb-2" htmlFor="title">Property Title</label>
                        <input 
                            type="text"
                            name="propertyDetails.title"
                            value={formData.propertyDetails.title}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Enter Property Title"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-semibold mb-2" htmlFor="type">Property Type</label>
                        <select 
                            name="propertyDetails.type"
                            value={formData.propertyDetails.type}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="Apartment">Apartment</option>
                            <option value="House">House</option>
                            <option value="Villa">Villa</option>
                            <option value="Office">Office</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block font-semibold mb-2" htmlFor="category">Category</label>
                        <select 
                            name="propertyDetails.category"
                            value={formData.propertyDetails.category}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="For Sale">For Sale</option>
                            <option value="For Rent">For Rent</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block font-semibold mb-2" htmlFor="price">Price</label>
                        <input 
                            type="number"
                            name="propertyDetails.price"
                            value={formData.propertyDetails.price}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Enter Price"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-semibold mb-2" htmlFor="location">Location</label>
                        <input 
                            type="text"
                            name="propertyDetails.location"
                            value={formData.propertyDetails.location}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Enter Location"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-semibold mb-2" htmlFor="status">Status</label>
                        <select 
                            name="propertyDetails.status"
                            value={formData.propertyDetails.status}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="Available">Available</option>
                            <option value="Sold">Sold</option>
                            <option value="Rented">Rented</option>
                        </select>
                    </div>
                </div>
            )}

            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Submit Client
            </button>
        </form>
    );
};

export default ClientForm;