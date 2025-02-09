import React, { useState } from 'react';
import PropertyForm from './PropertyForm';  // Import the existing PropertyForm

const ClientForm = ({ onSubmitClient, onSubmitProperty }) => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        type: 'Buyer',
        contactInfo: '',
        source: 'Facebook',
    });

    const [showPropertyForm, setShowPropertyForm] = useState(false);
    const [propertyData, setPropertyData] = useState(null);  // Store property data before submission

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Determine if the client type is an owner and show the property form accordingly
        if (name === 'type') {
            const ownerTypes = ['Seller', 'Renter', 'Landlord'];
            setShowPropertyForm(ownerTypes.includes(value));
        }
    };

    const handleSubmitClient = (e) => {
        e.preventDefault();
        onSubmitClient(formData);

        // If the client is an owner, submit the property data
        if (showPropertyForm && propertyData) {
            onSubmitProperty(propertyData);
        }

        // Reset form
        setFormData({
            id: '',
            name: '',
            type: 'Buyer',
            contactInfo: '',
            source: 'Facebook',
        });
        setShowPropertyForm(false);
    };

    return (
        <form onSubmit={handleSubmitClient} className="p-6 border rounded shadow-md bg-white">
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

            {/* Conditionally show the property form if the client is an owner */}
            {showPropertyForm && (
                <div className="p-4 border rounded bg-gray-50 mt-4">
                    <h3 className="text-lg font-bold mb-4">Property Details</h3>
                    <PropertyForm
                        onSubmit={(property) => setPropertyData(property)}
                    />
                </div>
            )}

            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Submit Client
            </button>
        </form>
    );
};

export default ClientForm;