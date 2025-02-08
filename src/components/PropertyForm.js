import React, { useState, useEffect } from 'react';

const PropertyForm = ({ onSubmit, property = {}, isEditing }) => {
    const [formData, setFormData] = useState({
        propertyId: '',
        title: '',
        type: 'Residential',
        category: 'For Sale',
        price: '',
        location: '',
        status: 'Available',
        media: []
    });

    useEffect(() => {
        if (isEditing && property) {
            setFormData({
                propertyId: property.propertyId,
                title: property.title,
                type: property.type,
                category: property.category,
                price: property.price,
                location: property.location,
                status: property.status,
                media: property.media
            });
        }
    }, [isEditing, property]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleMediaUpload = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFormData((prevState) => ({
            ...prevState,
            media: [...prevState.media, ...selectedFiles]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);  // Pass the form data to the parent component (save or add)
        alert('Property saved successfully!');
        setFormData({
            propertyId: '',
            title: '',
            type: 'Residential',
            category: 'For Sale',
            price: '',
            location: '',
            status: 'Available',
            media: []
        });
    };

    return (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Property' : 'Add New Property'}</h2>
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
                    <label className="block mb-2">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="For Sale">For Sale</option>
                        <option value="For Rent">For Rent</option>
                        <option value="For Sale and Rent">For Sale and Rent</option>
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
                        <option value="Rented">Rented</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Upload Images/Videos (Optional)</label>
                    <input
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        onChange={handleMediaUpload}
                        className="w-full p-2 border rounded"
                    />
                    {formData.media.length > 0 && (
                        <div className="mt-4">
                            <h4 className="font-semibold">Uploaded Files:</h4>
                            <ul className="list-disc ml-5">
                                {formData.media.map((file, index) => (
                                    <li key={index} className="text-sm text-gray-600">
                                        {file.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
                    Submit Property
                </button>
            </form>
        </div>
    );
};

export default PropertyForm;