import React, { useState } from 'react';
import PropertyForm from '../components/PropertyForm';

const Properties = () => {
    const [properties, setProperties] = useState([]);  // Store list of properties
    const [showForm, setShowForm] = useState(false);  // Toggle form visibility

    const handleAddProperty = (newProperty) => {
        setProperties([...properties, newProperty]);  // Add new property to the list
        setShowForm(false);  // Hide the form after submission
    };

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6">Properties Management</h1>
            
            {/* Toggle Form Button */}
            <button
                onClick={() => setShowForm(!showForm)}
                className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
            >
                {showForm ? 'Hide Form' : 'Add New Property'}
            </button>

            {/* Display Form Conditionally */}
            {showForm && (
                <PropertyForm
                    onSubmit={(newProperty) => handleAddProperty(newProperty)}
                />
            )}

            {/* List of Properties */}
            <h2 className="text-2xl font-bold mt-6">Listed Properties</h2>
            <ul className="mt-4 space-y-4">
                {properties.length === 0 ? (
                    <p>No properties listed yet.</p>
                ) : (
                    properties.map((property, index) => (
                        <li key={index} className="border p-4 rounded shadow">
                            <h3 className="text-xl font-bold">{property.title}</h3>
                            <p><strong>ID:</strong> {property.propertyId}</p>
                            <p><strong>Type:</strong> {property.type}</p>
                            <p><strong>Category:</strong> {property.category}</p>
                            <p><strong>Price:</strong> ${property.price}</p>
                            <p><strong>Location:</strong> {property.location}</p>
                            <p><strong>Status:</strong> {property.status}</p>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default Properties;