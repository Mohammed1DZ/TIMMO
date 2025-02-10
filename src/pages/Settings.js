import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = ({ userRole }) => {
    const navigate = useNavigate();

    // Redirect if the user is not Super Admin or Admin
    useEffect(() => {
        if (userRole !== 'Super Admin' && userRole !== 'Admin') {
            navigate('/');  // Redirect to the Dashboard or another accessible page
        }
    }, [userRole, navigate]);

    // Hide the term "Super Admin" when viewed by Admins
    const displayedRole = userRole === 'Super Admin' && userRole !== 'Admin' ? 'Admin' : userRole;

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6">Settings Page</h1>
            <p><strong>Current Role:</strong> {displayedRole}</p>

            {/* Placeholder sections */}
            <div className="mt-6 space-y-6">
                <section className="bg-gray-100 p-4 rounded">
                    <h2 className="text-2xl font-semibold">General Settings</h2>
                    <p>Placeholder for language toggle, dark mode, etc.</p>
                </section>

                <section className="bg-gray-100 p-4 rounded">
                    <h2 className="text-2xl font-semibold">Form Field Management</h2>
                    <p>Super Admin can dynamically add, edit, or remove form fields.</p>
                </section>

                <section className="bg-gray-100 p-4 rounded">
                    <h2 className="text-2xl font-semibold">Button Visibility</h2>
                    <p>Controls to show or hide Edit/Delete buttons per role.</p>
                </section>

                <section className="bg-gray-100 p-4 rounded">
                    <h2 className="text-2xl font-semibold">User & Role Management</h2>
                    <p>Manage user roles, including promoting or demoting users.</p>
                </section>

                <section className="bg-gray-100 p-4 rounded">
                    <h2 className="text-2xl font-semibold">Backup & Restore Data</h2>
                    <p>Placeholder for data export/import functionality.</p>
                </section>
            </div>
        </div>
    );
};

export default Settings;