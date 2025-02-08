import React, { useState, useEffect } from 'react';

const PropertyDetailsModal = ({ property, onClose, onEdit, onDelete }) => {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const [fullScreenMedia, setFullScreenMedia] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (!property) return null;

    // Keyboard navigation for media
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') handlePreviousMedia();
            if (e.key === 'ArrowRight') handleNextMedia();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentMediaIndex]);

    const handlePreviousMedia = () => {
        setCurrentMediaIndex((prev) => (prev === 0 ? property.media.length - 1 : prev - 1));
    };

    const handleNextMedia = () => {
        setCurrentMediaIndex((prev) => (prev === property.media.length - 1 ? 0 : prev + 1));
    };

    const handleDelete = () => {
        if (email === 'admin@example.com' && password === '123456') {
            onDelete(property.propertyId);  // Trigger delete if credentials are valid
            setShowDeleteConfirmation(false);
            onClose();
        } else {
            alert('Invalid email or password.');
        }
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
                {/* X button to close */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-black"
                >
                    X
                </button>

                <h2 className="text-2xl font-bold mb-4">{property.title}</h2>
                <p><strong>ID:</strong> {property.propertyId}</p>
                <p><strong>Type:</strong> {property.type}</p>
                <p><strong>Category:</strong> {property.category}</p>
                <p><strong>Price:</strong> ${property.price}</p>
                <p><strong>Location:</strong> {property.location}</p>
                <p><strong>Status:</strong> {property.status}</p>

                {/* Display media if available */}
                {property.media && property.media.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-lg font-bold">Media</h3>
                        <div className="relative">
                            {/* Display image/video */}
                            <div
                                className="flex justify-center items-center cursor-pointer"
                                onClick={() => openFullScreenMedia(property.media[currentMediaIndex])}
                            >
                                {property.media[currentMediaIndex].type.startsWith('image') ? (
                                    <img
                                        src={URL.createObjectURL(property.media[currentMediaIndex])}
                                        alt="Property media"
                                        className="w-full h-64 object-cover rounded"
                                    />
                                ) : (
                                    <video
                                        src={URL.createObjectURL(property.media[currentMediaIndex])}
                                        controls
                                        className="w-full h-64 object-cover rounded"
                                    />
                                )}
                            </div>

                            {/* Media navigation */}
                            <div className="flex justify-between mt-2">
                                <button
                                    onClick={handlePreviousMedia}
                                    className="bg-gray-300 p-2 rounded"
                                >
                                    &#8592; Previous
                                </button>
                                <button
                                    onClick={handleNextMedia}
                                    className="bg-gray-300 p-2 rounded"
                                >
                                    Next &#8594;
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-4 flex justify-between">
                    {/* Edit Button */}
                    <button
                        onClick={() => {
                            onEdit();
                            onClose();  // Close the modal when switching to edit
                        }}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Edit
                    </button>

                    {/* Delete Button */}
                    {showDeleteConfirmation ? (
                        <div className="mt-4">
                            <h3 className="font-bold mb-2">Confirm Deletion</h3>
                            <input
                                type="email"
                                placeholder="Admin Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border rounded mb-2"
                            />
                            <input
                                type="password"
                                placeholder="Admin Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 border rounded mb-2"
                            />
                            <div className="flex justify-between">
                                <button
                                    onClick={handleDelete}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Confirm Delete
                                </button>
                                <button
                                    onClick={() => setShowDeleteConfirmation(false)}
                                    className="bg-gray-300 px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowDeleteConfirmation(true)}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Delete
                        </button>
                    )}
                </div>
            </div>

            {/* Full-screen media display */}
            {fullScreenMedia && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                    <button
                        onClick={closeFullScreenMedia}
                        className="absolute top-2 right-2 text-white text-2xl"
                    >
                        X
                    </button>
                    {fullScreenMedia.type.startsWith('image') ? (
                        <img
                            src={URL.createObjectURL(fullScreenMedia)}
                            alt="Full screen media"
                            className="w-auto max-h-full rounded"
                        />
                    ) : (
                        <video
                            src={URL.createObjectURL(fullScreenMedia)}
                            controls
                            className="w-auto max-h-full rounded"
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default PropertyDetailsModal;