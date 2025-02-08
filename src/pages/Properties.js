import React, { useState } from 'react';
import PropertyForm from '../components/PropertyForm';

const Properties = () => {
    const [properties, setProperties] = useState([]);  // Store the list of properties
    const [selectedProperty, setSelectedProperty] = useState(null);  // Track the property to edit
    const [isEditing, setIsEditing] = useState(false);  // Track editing mode
    const [showForm, setShowForm] = useState(false);  // Toggle form visibility

    // Function to add a new property
    const handleAddProperty = (newProperty) => {
        setProperties([...properties, newProperty]);
        setShowForm(false);
    };

    // Function to handle property edits
    const handleEditProperty = (property) => {
        setSelectedProperty(property);  // Set the property to be edited
        setIsEditing(true);  // Enable editing mode
        setShowForm(true);  // Show the form with current details
    };

    // Function to save the edited property
    const handleSaveEditedProperty = (updatedProperty) => {
        setProperties(properties.map((property) =>
            property.propertyId === updatedProperty.propertyId ? updatedProperty : property
        ));
        setShowForm(false);  // Hide the form
        setIsEditing(false);  // Exit editing mode
        setSelectedProperty(null);  // Clear selected property
    };

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6">Properties Management</h1>

            <button
                onClick={() => {
                    setShowForm(!showForm);
                    setIsEditing(false);  // Reset editing mode when adding a new property
                    setSelectedProperty(null);  // Clear selected property when adding new
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
            >
                {showForm ? 'Hide Form' : 'Add New Property'}
            </button>

            {/* Show the form for adding or editing */}
            {showForm && (
                <PropertyForm
                    onSubmit={isEditing ? handleSaveEditedProperty : handleAddProperty}
                    property={selectedProperty}  // Pass the selected property for editing
                    isEditing={isEditing}
                />
            )}

            <h2 className="text-2xl font-bold mt-6">Listed Properties</h2>
            <ul className="mt-4 space-y-4">
                {properties.length === 0 ? (
                    <p>No properties listed yet.</p>
                ) : (
                    properties.map((property, index) => (
                        <li key={index} className="border p-4 rounded shadow">
                            <h3 className="text-xl font-bold">{property.title}</h3>
                            <p><strong>Location:</strong> {property.location}</p>
                            <p><strong>Price:</strong> ${property.price}</p>
                            <p><strong>Status:</strong> {property.status}</p>

                            {/* Edit Button */}
                            <button
                                onClick={() => handleEditProperty(property)}
                                className="bg-yellow-500 text-white px-4 py-2 rounded mt-2"
                            >
                                Edit
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default Properties;