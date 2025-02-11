import React, { useState, useEffect } from 'react';

const initialForms = {
    AgentForm: [
        { fieldName: 'agentName', label: 'Agent Name', type: 'text', required: true },
        { fieldName: 'phoneNumber', label: 'Phone Number', type: 'tel', required: true },
        { fieldName: 'email', label: 'Email', type: 'email', required: false },
    ],
    ClientForm: [
        { fieldName: 'name', label: 'Client Name', type: 'text', required: true },
        { fieldName: 'phoneNumber', label: 'Phone Number', type: 'tel', required: true },
        { fieldName: 'clientType', label: 'Client Type', type: 'select', options: ['Seller', 'Renter', 'Buyer', 'Tenant'] },
    ],
    PropertyForm: [
        { fieldName: 'title', label: 'Property Title', type: 'text', required: true },
        { fieldName: 'price', label: 'Price', type: 'number', required: true },
        { fieldName: 'location', label: 'Location', type: 'text', required: true },
    ],
};

const FormFieldManagement = () => {
    const [selectedForm, setSelectedForm] = useState('AgentForm');
    const [formFields, setFormFields] = useState([]);
    const [newField, setNewField] = useState({ fieldName: '', label: '', type: 'text', required: false });

    // Load form fields from localStorage on component mount
    useEffect(() => {
        const savedFields = JSON.parse(localStorage.getItem('formFields')) || initialForms;
        setFormFields(savedFields[selectedForm]);
    }, [selectedForm]);

    // Save form fields to localStorage whenever they change
    useEffect(() => {
        const savedFields = JSON.parse(localStorage.getItem('formFields')) || initialForms;
        savedFields[selectedForm] = formFields;
        localStorage.setItem('formFields', JSON.stringify(savedFields));
    }, [formFields]);

    const handleAddField = () => {
        if (!newField.fieldName || !newField.label) {
            alert('Field Name and Label are required.');
            return;
        }

        setFormFields([...formFields, { ...newField }]);
        setNewField({ fieldName: '', label: '', type: 'text', required: false });
    };

    const handleDeleteField = (index) => {
        const updatedFields = [...formFields];
        updatedFields.splice(index, 1);
        setFormFields(updatedFields);
    };

    return (
        <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Form Field Management</h2>

            {/* Form Selector */}
            <div className="mb-4">
                <label className="block text-gray-700">Select Form</label>
                <select
                    value={selectedForm}
                    onChange={(e) => setSelectedForm(e.target.value)}
                    className="w-full p-2 border rounded"
                >
                    <option value="AgentForm">Agent Form</option>
                    <option value="ClientForm">Client Form</option>
                    <option value="PropertyForm">Property Form</option>
                </select>
            </div>

            {/* Current Fields Display */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Current Fields</h3>
                <ul>
                    {formFields.map((field, index) => (
                        <li key={index} className="flex justify-between items-center p-2 border-b">
                            <span>{field.label} ({field.type})</span>
                            <button
                                onClick={() => handleDeleteField(index)}
                                className="bg-red-500 text-white p-1 rounded"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Add New Field Form */}
            <div className="p-4 border rounded">
                <h4 className="text-lg font-semibold mb-2">Add New Field</h4>
                <div className="mb-2">
                    <label className="block text-gray-700">Field Name</label>
                    <input
                        type="text"
                        value={newField.fieldName}
                        onChange={(e) => setNewField({ ...newField, fieldName: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700">Label</label>
                    <input
                        type="text"
                        value={newField.label}
                        onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700">Type</label>
                    <select
                        value={newField.type}
                        onChange={(e) => setNewField({ ...newField, type: e.target.value })}
                        className="w-full p-2 border rounded"
                    >
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                        <option value="email">Email</option>
                        <option value="tel">Phone Number</option>
                        <option value="select">Select</option>
                    </select>
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700">
                        <input
                            type="checkbox"
                            checked={newField.required}
                            onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                        />{' '}
                        Required Field
                    </label>
                </div>
                <button
                    onClick={handleAddField}
                    className="bg-green-500 text-white p-2 rounded"
                >
                    Add Field
                </button>
            </div>
        </div>
    );
};

export default FormFieldManagement;