import React from 'react';

const PropertyDetailsModal = ({ property, onClose, onEdit }) => {
    if (!property) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">{property.title}</h2>
                <p><strong>ID:</strong> {property.propertyId}</p>
                <p><strong>Type:</strong> {property.type}</p>
                <p><strong>Category:</strong> {property.category}</p>
                <p><strong>Price:</strong> ${property.price}</p>
                <p><strong>Location:</strong> {property.location}</p>
                <p><strong>Status:</strong> {property.status}</p>

                {/* Display property media */}
                {property.media && property.media.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-lg font-bold">Media</h3>
                        {property.media.map((file, index) => (
                            <p key={index}>{file.name}</p>
                        ))}
                    </div>
                )}

                <div className="mt-4 flex justify-between">
                    <button
                        onClick={onEdit}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Edit
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetailsModal;