import React, { useState } from 'react';

const PropertyForm = ({ onPropertyDataChange }) => {
    const [propertyData, setPropertyData] = useState({
        id: '',
        title: '',
        type: 'Residential',
        category: 'For Sale',
        price: '',
        location: '',
        status: 'Available',
        media: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPropertyData({ ...propertyData, [name]: value });
        onPropertyDataChange({ ...propertyData, [name]: value });  // Pass updated data up
    };

    const handleMediaUpload = (e) => {
        setPropertyData({
            ...propertyData,
            media: Array.from(e.target.files),
        });
        onPropertyDataChange({
            ...propertyData,
            media: Array.from(e.target.files),
        });
    };

    return (
        <div>
            <div className="mb-4">
                <label className="block font-semibold mb-2">Property ID</label>
                <input
                    type="text"
                    name="id"
                    value={propertyData.id}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Property ID"
                />
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-2">Title/Name</label>
                <input
                    type="text"
                    name="title"
                    value={propertyData.title}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Property Title"
                />
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-2">Type</label>
                <select
                    name="type"
                    value={propertyData.type}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-2">Category</label>
                <select
                    name="category"
                    value={propertyData.category}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="For Sale">For Sale</option>
                    <option value="For Rent">For Rent</option>
                    <option value="Both">Both</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-2">Price</label>
                <input
                    type="number"
                    name="price"
                    value={propertyData.price}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Enter Price"
                />
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-2">Location</label>
                <input
                    type="text"
                    name="location"
                    value={propertyData.location}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Location"
                />
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-2">Status</label>
                <select
                    name="status"
                    value={propertyData.status}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="Available">Available</option>
                    <option value="Sold">Sold</option>
                    <option value="Rented">Rented</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-2">Upload Images/Videos (Optional)</label>
                <input
                    type="file"
                    multiple
                    onChange={handleMediaUpload}
                    className="w-full p-2 border rounded"
                />
            </div>
        </div>
    );
};

export default PropertyForm;