import React, { useState, useEffect } from 'react';

const PropertyDetailsModal = ({ property, onClose, onEdit, onDelete }) => {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const [fullScreenMedia, setFullScreenMedia] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);

    if (!property) return null;

    // Swipe detection using a threshold value (for touch devices)
    const SWIPE_THRESHOLD = 50;

    // Keyboard navigation for desktop users
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') handlePreviousMedia();
            if (e.key === 'ArrowRight') handleNextMedia();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentMediaIndex]);

    // Handle swipe start (record initial touch position)
    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
    };

    // Handle swipe end (record final touch position and determine swipe direction)
    const handleTouchEnd = (e) => {
        setTouchEndX(e.changedTouches[0].clientX);
        const swipeDistance = touchStartX - e.changedTouches[0].clientX;

        if (swipeDistance > SWIPE_THRESHOLD) {
            handleNextMedia();  // Swipe left
        } else if (swipeDistance < -SWIPE_THRESHOLD) {
            handlePreviousMedia();  // Swipe right
        }
    };

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
                    <div className="mt-4">
                        <h3 className="text-lg font-bold">Media</h3>
                        <div
                            className="relative"
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                        >
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

                            <div className="flex justify-between mt-2">
                                <button onClick={handlePreviousMedia} className="bg-gray-300 p-2 rounded">&#8592; Previous</button>
                                <button onClick={handleNextMedia} className="bg-gray-300 p-2 rounded">Next &#8594;</button>
                            </div>
                        </div>
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
                </div>
            )}
        </div>
    );
};

export default PropertyDetailsModal;