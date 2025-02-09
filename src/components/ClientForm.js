import React, { useState } from 'react';

const ClientForm = ({ onSubmit, availableProperties }) => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        type: 'Buyer',
        contactInfo: '',
        source: 'Facebook',
        propertyId: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            id: '',
            name: '',
            type: 'Buyer',
            contactInfo: '',
            source: 'Facebook',
            propertyId: '',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 border rounded shadow-md bg-white">
            <h2 className="text-2xl font-bold mb-4">Add New Client</h2>
            
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
                <label className="block font-semibold mb-2" htmlFor="source">Source of Information</label>
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

            {/* Related Property Dropdown */}
            <div className="mb-4">
                <label className="block font-semibold mb-2" htmlFor="propertyId">Related Property</label>
                <select
                    name="propertyId"
                    value={formData.propertyId}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="">Select Property</option>
                    {availableProperties.map((property) => (
                        <option key={property.id} value={property.id}>
                            {property.title} - {property.location}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Submit Client
            </button>
        </form>
    );
};

export default ClientForm;