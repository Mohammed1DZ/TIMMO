import React, { useState, useEffect } from 'react';

const PropertyDetailsModal = ({ property, onClose, onEdit, onDelete }) => {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const [fullScreenMedia, setFullScreenMedia] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (!property) return null;

    const handlePreviousMedia = () => {
        setCurrentMediaIndex((prev) => (prev === 0 ? property.media.length - 1 : prev - 1));
    };

    const handleNextMedia = () => {
        setCurrentMediaIndex((prev) => (prev === property.media.length - 1 ? 0 : prev + 1));
    };

    const openFullScreenMedia = (media) => {
        setFullScreenMedia(media);
    };

    const closeFullScreenMedia = () => {
        setFullScreenMedia(null);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black">X</button>
                <h2 className="text-2xl font-bold mb-4">{property.title}</h2>
                <p><strong>ID:</strong> {property.propertyId}</p>
                <p><strong>Type:</strong> {property.type}</p>
                <p><strong>Category:</strong> {property.category}</p>
                <p><strong>Price:</strong> ${property.price}</p>
                <p><strong>Location:</strong> {property.location}</p>
                <p><strong>Status:</strong> {property.status}</p>

                {property.media && property.media.length > 0 && (
                    <div className="relative w-full h-64 flex justify-center items-center">
                        {/* Media */}
                        <div
                            className="relative w-full h-full cursor-pointer"
                            onClick={() => openFullScreenMedia(property.media[currentMediaIndex])}
                        >
                            {property.media[currentMediaIndex].type.startsWith('image') ? (
                                <img
                                    src={URL.createObjectURL(property.media[currentMediaIndex])}
                                    alt="Property media"
                                    className="w-full h-full object-cover rounded"
                                />
                            ) : (
                                <video
                                    src={URL.createObjectURL(property.media[currentMediaIndex])}
                                    controls
                                    className="w-full h-full object-cover rounded"
                                />
                            )}
                        </div>

                        {/* Previous Arrow */}
                        <button
                            onClick={handlePreviousMedia}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full opacity-75 hover:opacity-100 focus:outline-none"
                        >
                            &#10094;
                        </button>

                        {/* Next Arrow */}
                        <button
                            onClick={handleNextMedia}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full opacity-75 hover:opacity-100 focus:outline-none"
                        >
                            &#10095;
                        </button>
                    </div>
                )}

                <div className="mt-4 flex justify-between">
                    <button onClick={onEdit} className="bg-green-500 text-white px-4 py-2 rounded">Edit</button>
                    <button onClick={() => setShowDeleteConfirmation(true)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                </div>
            </div>

            {fullScreenMedia && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                    <button onClick={closeFullScreenMedia} className="absolute top-2 right-2 text-white text-2xl">X</button>
                    {fullScreenMedia.type.startsWith('image') ? (
                        <img src={URL.createObjectURL(fullScreenMedia)} alt="Full screen media" className="w-auto max-h-full rounded" />
                    ) : (
                        <video src={URL.createObjectURL(fullScreenMedia)} controls className="w-auto max-h-full rounded" />
                    )}

                    {/* Previous and Next arrows in fullscreen */}
                    <button
                        onClick={handlePreviousMedia}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full opacity-75 hover:opacity-100 focus:outline-none"
                    >
                        &#10094;
                    </button>
                    <button
                        onClick={handleNextMedia}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full opacity-75 hover:opacity-100 focus:outline-none"
                    >
                        &#10095;
                    </button>
                </div>
            )}
        </div>
    );
};

export default PropertyDetailsModal;