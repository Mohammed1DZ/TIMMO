import React, { useState } from 'react';

const PropertyDetailsModal = ({ property, onClose, onDelete }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const [adminEmail, setAdminEmail] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(false);

    const media = property.media;

    // Navigation handlers
    const handleNext = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
    const handlePrevious = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + media.length) % media.length);

    // Handle clicking on media to open fullscreen view
    const handleMediaClick = () => setIsFullscreen(true);
    const handleFullscreenClose = () => setIsFullscreen(false);

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
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose}  // Close when clicking outside the modal
        >
            <div
                className="bg-white p-6 rounded shadow-md w-full max-w-lg relative"
                onClick={(e) => e.stopPropagation()}  // Prevent close when clicking inside
            >
                <h2 className="text-2xl font-bold mb-4">{property.title}</h2>
                <p><strong>ID:</strong> {property.propertyId}</p>
                <p><strong>Type:</strong> {property.type}</p>
                <p><strong>Category:</strong> {property.category}</p>
                <p><strong>Price:</strong> ${property.price}</p>
                <p><strong>Location:</strong> {property.location}</p>
                <p><strong>Status:</strong> {property.status}</p>

                {/* Media Display */}
                {media.length > 0 && (
                    <div className="mt-6 relative">
                        {media[currentIndex].type.startsWith('image') ? (
                            <img
                                src={URL.createObjectURL(media[currentIndex])}
                                alt={media[currentIndex].name}
                                className="w-full h-64 object-cover rounded cursor-pointer"
                                onClick={handleMediaClick}  // Open fullscreen on click
                            />
                        ) : (
                            <video
                                controls
                                className="w-full h-64 object-cover rounded cursor-pointer"
                                onClick={handleMediaClick}  // Open fullscreen on click
                            >
                                <source src={URL.createObjectURL(media[currentIndex])} type={media[currentIndex].type} />
                            </video>
                        )}

                        {/* Navigation Arrows */}
                        {media.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrevious}
                                    className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
                                >
                                    &#8592;
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
                                >
                                    &#8594;
                                </button>
                            </>
                        )}
                    </div>
                )}

                {/* Edit and Delete Options */}
                <div className="mt-6 flex justify-between">
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={() => alert('Edit functionality coming soon!')}
                    >
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

            {/* Fullscreen Media Viewer */}
            {isFullscreen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
                    onClick={handleFullscreenClose}  // Close fullscreen on outside click
                >
                    <button
                        className="absolute top-4 right-4 text-white text-2xl"
                        onClick={handleFullscreenClose}
                    >
                        &#x2715;  {/* Close (X) button */}
                    </button>

                    {media[currentIndex].type.startsWith('image') ? (
                        <img
                            src={URL.createObjectURL(media[currentIndex])}
                            alt={media[currentIndex].name}
                            className="w-auto max-h-full rounded"
                        />
                    ) : (
                        <video controls className="w-auto max-h-full rounded">
                            <source src={URL.createObjectURL(media[currentIndex])} type={media[currentIndex].type} />
                        </video>
                    )}

                    {/* Navigation Arrows in Fullscreen */}
                    {media.length > 1 && (
                        <>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handlePrevious();
                                }}
                                className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-3xl"
                            >
                                &#8592;
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleNext();
                                }}
                                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-3xl"
                            >
                                &#8594;
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default PropertyDetailsModal;