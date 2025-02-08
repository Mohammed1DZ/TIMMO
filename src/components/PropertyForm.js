import React, { useState } from 'react';

const PropertyForm = () => {
    const [formData, setFormData] = useState({
        propertyId: '',
        title: '',
        type: 'Residential',
        price: '',
        location: '',
        status: 'Available'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted Property:', formData);
        alert('Property added successfully!');
        setFormData({
            propertyId: '',
            title: '',
            type: 'Residential',
            price: '',
            location: '',
            status: 'Available'
        });
    };

    return (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Add New Property</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">Property ID</label>
                    <input
                        type="text"
                        name="propertyId"
                        value={formData.propertyId}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block mb-2">Title/Name</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Land">Land</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="Available">Available</option>
                        <option value="Sold">Sold</option>
                    </select>
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
                    Submit Property
                </button>
            </form>
        </div>
    );
};

export default PropertyForm;