import React, { useState } from 'react';

const PropertyDetailsModal = ({ property, onClose, onDelete }) => {
    const [adminEmail, setAdminEmail] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleDelete = () => {
        if (adminEmail === 'admin@example.com' && adminPassword === 'password123') {
            onDelete(property.propertyId);
            alert('Property deleted successfully.');
            onClose();  // Close the modal
        } else {
            alert('Invalid email or password.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4">{property.title}</h2>
                <p><strong>ID:</strong> {property.propertyId}</p>
                <p><strong>Type:</strong> {property.type}</p>
                <p><strong>Category:</strong> {property.category}</p>
                <p><strong>Price:</strong> ${property.price}</p>
                <p><strong>Location:</strong> {property.location}</p>
                <p><strong>Status:</strong> {property.status}</p>

                {/* Media Display */}
                {property.media.length > 0 && (
                    <div className="mt-4">
                        <h3 className="font-semibold">Media Files:</h3>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            {property.media.map((file, index) => (
                                <div key={index}>
                                    {file.type.startsWith('image') ? (
                                        <img src={URL.createObjectURL(file)} alt={file.name} className="w-full h-32 object-cover rounded" />
                                    ) : (
                                        <video controls className="w-full h-32 object-cover rounded">
                                            <source src={URL.createObjectURL(file)} type={file.type} />
                                        </video>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Edit and Delete Options */}
                <div className="mt-6 flex justify-between">
                    <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => alert('Edit functionality coming soon!')}>
                        Edit
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => setConfirmDelete(!confirmDelete)}
                    >
                        Delete
                    </button>
                </div>

                {/* Confirm Deletion */}
                {confirmDelete && (
                    <div className="mt-4">
                        <h4 className="font-bold">Confirm Deletion</h4>
                        <input
                            type="email"
                            placeholder="Admin Email"
                            value={adminEmail}
                            onChange={(e) => setAdminEmail(e.target.value)}
                            className="w-full p-2 border rounded mt-2"
                        />
                        <input
                            type="password"
                            placeholder="Admin Password"
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            className="w-full p-2 border rounded mt-2"
                        />
                        <button
                            className="bg-red-600 text-white px-4 py-2 rounded mt-2"
                            onClick={handleDelete}
                        >
                            Confirm Delete
                        </button>
                    </div>
                )}

                {/* Close Modal Button */}
                <button className="mt-6 text-blue-600 underline" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default PropertyDetailsModal;