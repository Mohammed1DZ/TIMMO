import React, { useState, useEffect } from 'react';

const PropertyDetailsModal = ({ property, onClose, onEdit, onDelete }) => {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);

    if (!property) return null;

    const SWIPE_THRESHOLD = 50;

    // Handle touch gestures for swipe navigation
    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e) => {
        setTouchEndX(e.changedTouches[0].clientX);
        const swipeDistance = touchStartX - touchEndX;

        if (swipeDistance > SWIPE_THRESHOLD) {
            handleNextMedia();  // Swipe left for next
        } else if (swipeDistance < -SWIPE_THRESHOLD) {
            handlePreviousMedia();  // Swipe right for previous
        }
    };

    const handlePreviousMedia = () => {
        setCurrentMediaIndex((prev) => (prev === 0 ? property.media.length - 1 : prev - 1));
    };

    const handleNextMedia = () => {
        setCurrentMediaIndex((prev) => (prev === property.media.length - 1 ? 0 : prev + 1));
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
                        <div
                            className="relative w-full h-full cursor-pointer"
                            onClick={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
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

            {/* Full-Screen Media Viewer */}
            {property.media && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center">
                    <button onClick={onClose} className="absolute top-2 right-2 text-white text-2xl">X</button>

                    {property.media[currentMediaIndex].type.startsWith('image') ? (
                        <img
                            src={URL.createObjectURL(property.media[currentMediaIndex])}
                            alt="Full screen media"
                            className="w-auto max-h-full rounded"
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                        />
                    ) : (
                        <video
                            src={URL.createObjectURL(property.media[currentMediaIndex])}
                            controls
                            className="w-auto max-h-full rounded"
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                        />
                    )}

                    {/* Navigation arrows in full-screen */}
                    <button
                        onClick={handlePreviousMedia}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full opacity-75 hover:opacity-100 focus:outline-none"
                    >
                        &#10094;
                    </button>
                    <button
                        onClick={handleNextMedia}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full opacity-75 hover:opacity-100 focus:outline-none"
                    >
                        &#10095;
                    </button>
                </div>
            )}
        </div>
    );
};

export default PropertyDetailsModal;