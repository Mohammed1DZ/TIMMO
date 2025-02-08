import React, { useState } from 'react';
import PropertyForm from '../components/PropertyForm';
import PropertyDetailsModal from '../components/PropertyDetailsModal';

const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Function to add a new property
    const handleAddProperty = (newProperty) => {
        setProperties([...properties, newProperty]);
        setShowForm(false);
    };

    // Function to handle property edits
    const handleEditProperty = (e, property) => {
        e.stopPropagation();  // Prevent the property click event from firing
        setSelectedProperty(property);
        setIsEditing(true);
        setShowForm(true);
    };

    // Function to save the edited property
    const handleSaveEditedProperty = (updatedProperty) => {
        setProperties(properties.map((property) =>
            property.propertyId === updatedProperty.propertyId ? updatedProperty : property
        ));
        setShowForm(false);
        setIsEditing(false);
        setSelectedProperty(null);
    };

    // Function to handle property click for popup details
    const handlePropertyClick = (property) => {
        setSelectedProperty(property);
    };

    // Function to close the property details popup
    const handleCloseModal = () => {
        setSelectedProperty(null);
    };

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6">Properties Management</h1>

            <button
                onClick={() => {
                    setShowForm(!showForm);
                    setIsEditing(false);
                    setSelectedProperty(null);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
            >
                {showForm ? 'Hide Form' : 'Add New Property'}
            </button>

            {/* Show the form for adding or editing */}
            {showForm && (
                <PropertyForm
                    onSubmit={isEditing ? handleSaveEditedProperty : handleAddProperty}
                    property={selectedProperty}
                    isEditing={isEditing}
                />
            )}

            <h2 className="text-2xl font-bold mt-6">Listed Properties</h2>
            <ul className="mt-4 space-y-4">
                {properties.length === 0 ? (
                    <p>No properties listed yet.</p>
                ) : (
                    properties.map((property, index) => (
                        <li
                            key={index}
                            className="border p-4 rounded shadow cursor-pointer hover:bg-gray-100"
                            onClick={() => handlePropertyClick(property)}  // Handle popup details
                        >
                            <h3 className="text-xl font-bold">{property.title}</h3>
                            <p><strong>Location:</strong> {property.location}</p>
                            <p><strong>Price:</strong> ${property.price}</p>
                            <p><strong>Status:</strong> {property.status}</p>

                            {/* Edit Button */}
                            <button
                                onClick={(e) => handleEditProperty(e, property)}  // Prevent property click when editing
                                className="bg-yellow-500 text-white px-4 py-2 rounded mt-2"
                            >
                                Edit
                            </button>
                        </li>
                    ))
                )}
            </ul>

            {selectedProperty && (
                <PropertyDetailsModal
                    property={selectedProperty}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default Properties;