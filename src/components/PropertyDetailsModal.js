import React, { useState } from 'react';

const PropertyDetailsModal = ({ property, onClose, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ ...property });
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const correctEmail = 'admin@example.com';  // Replace with actual admin email
    const correctPassword = 'admin123';        // Replace with actual admin password

    const handleSave = () => {
        onEdit(editData);
        setIsEditing(false);
    };

    const handleDeleteConfirmation = () => {
        if (emailInput === correctEmail && passwordInput === correctPassword) {
            onDelete(property.propertyId);
            alert('Property successfully deleted.');
            setShowConfirmDelete(false);
            onClose();  // Close the modal after successful deletion
        } else {
            alert('Invalid email or password. Please try again.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
                onClick={(e) => e.stopPropagation()}  // Prevent closing when clicking inside
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-black"
                >
                    &#10005;
                </button>

                {!isEditing ? (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Property Details</h2>
                        <p><strong>Property ID:</strong> {property.propertyId}</p>
                        <p><strong>Title:</strong> {property.title}</p>
                        <p><strong>Type:</strong> {property.type}</p>
                        <p><strong>Category:</strong> {property.category}</p>
                        <p><strong>Price:</strong> ${property.price}</p>
                        <p><strong>Location:</strong> {property.location}</p>
                        <p><strong>Status:</strong> {property.status}</p>
                        <p><strong>Floor Area:</strong> {property.floorArea} m²</p>
                        <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
                        <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
                        <p><strong>Year Built/Renovated:</strong> {property.yearBuilt}</p>
                        <p><strong>Amenities:</strong> {property.amenities}</p>
                        <p><strong>Description:</strong> {property.description}</p>

                        {/* Display related client ID */}
                        {property.ownerId && (
                            <p><strong>Client ID:</strong> {property.ownerId}</p>
                        )}

                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-green-500 text-white p-2 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => setShowConfirmDelete(true)}
                                className="bg-red-500 text-white p-2 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ) : (
                    // Edit form
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Edit Property</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={editData.title}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Type</label>
                            <select
                                name="type"
                                value={editData.type}
                                onChange={handleChange}
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
                                value={editData.category}
                                onChange={handleChange}
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
                                value={editData.price}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={editData.location}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Status</label>
                            <select
                                name="status"
                                value={editData.status}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="Available">Available</option>
                                <option value="Sold">Sold</option>
                                <option value="Rented">Rented</option>
                            </select>
                        </div>

                        <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded">
                            Save Changes
                        </button>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showConfirmDelete && (
                    <div className="mt-4 p-4 bg-gray-100 rounded shadow-md">
                        <h3 className="text-lg font-bold mb-2">Confirm Deletion</h3>
                        <p>Please enter the admin email and password to confirm deletion:</p>
                        <input
                            type="email"
                            placeholder="Email"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            className="w-full p-2 border rounded mt-2"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            className="w-full p-2 border rounded mt-2"
                            required
                        />
                        <div className="flex justify-end space-x-2 mt-4">
                            <button
                                onClick={handleDeleteConfirmation}
                                className="bg-red-500 text-white p-2 rounded"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={() => setShowConfirmDelete(false)}
                                className="bg-gray-300 p-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PropertyDetailsModal;