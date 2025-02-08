import React from 'react';
import PropertyForm from '../components/PropertyForm';

const Properties = () => {
    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6">Properties Management</h1>
            <p className="mb-6">This is the properties page where you can view and manage properties.</p>
            
            {/* Property Form */}
            <PropertyForm />
        </div>
    );
};

export default Properties;