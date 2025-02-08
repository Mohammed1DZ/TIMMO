import React, { useState } from 'react';
import PropertyForm from '../components/PropertyForm';
import PropertyDetailsModal from '../components/PropertyDetailsModal';

const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);

    const handleAddProperty = (newProperty) => {
        setProperties([...properties, newProperty]);
        setShowForm(false);
    };

    const handleDeleteProperty = (propertyId) => {
        setProperties(properties.filter((property) => property.propertyId !== propertyId));
    };

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6">Properties Management</h1>

            <button
                onClick={() => setShowForm(!showForm)}
                className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
            >
                {showForm ? 'Hide Form' : 'Add New Property'}
            </button>

            {showForm && (
                <PropertyForm onSubmit={(newProperty) => handleAddProperty(newProperty)} />
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
                            onClick={() => setSelectedProperty(property)}
                        >
                            <h3 className="text-xl font-bold">{property.title}</h3>
                            <p><strong>Location:</strong> {property.location}</p>
                            <p><strong>Price:</strong> ${property.price}</p>
                            <p><strong>Status:</strong> {property.status}</p>
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