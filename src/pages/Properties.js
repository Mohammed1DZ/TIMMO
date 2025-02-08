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

    // Function to delete a property
    const handleDeleteProperty = (propertyId) => {
        setProperties(properties.filter((property) => property.propertyId !== propertyId));
    };

    // Function to start editing a property
    const handleEditProperty = (property) => {
        setSelectedProperty(property); // Set the selected property to edit
        setIsEditing(true); // Enable editing mode
        setShowForm(true); // Show the form
    };

    // Function to save edited property
    const handleSaveEditedProperty = (updatedProperty) => {
        setProperties(properties.map((property) =>
            property.propertyId === updatedProperty.propertyId ? updatedProperty : property
        ));
        setShowForm(false); // Hide the form after saving
        setIsEditing(false); // Disable editing mode
    };

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6">Properties Management</h1>

            <button
                onClick={() => {
                    setShowForm(!showForm);
                    setIsEditing(false); // Reset the edit state when adding a new property
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
            >
                {showForm ? 'Hide Form' : 'Add New Property'}
            </button>

            {showForm && (
                <PropertyForm
                    onSubmit={isEditing ? handleSaveEditedProperty : handleAddProperty}
                    property={selectedProperty} // Pass selected property for editing
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
                            onClick={() => setSelectedProperty(property)} // Display property details on click
                        >
                            <h3 className="text-xl font-bold">{property.title}</h3>
                            <p><strong>Location:</strong> {property.location}</p>
                            <p><strong>Price:</strong> ${property.price}</p>
                            <p><strong>Status:</strong> {property.status}</p>

                            {/* Edit Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent clicking on the property
                                    handleEditProperty(property); // Open the edit form with selected property data
                                }}
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
                    onClose={() => setSelectedProperty(null)}
                    onDelete={handleDeleteProperty}
                />
            )}
        </div>
    );
};

export default Properties;