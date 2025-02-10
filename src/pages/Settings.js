import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VisibilitySettings from '../components/VisibilitySettings';

const Settings = ({ userRole }) => {
    const navigate = useNavigate();

    // Redirect if the user is not Super Admin or Admin
    useEffect(() => {
        if (userRole !== 'Super Admin' && userRole !== 'Admin') {
            navigate('/');  // Redirect to the Dashboard or another accessible page
        }
    }, [userRole, navigate]);

    const handleSaveVisibilitySettings = (settings) => {
        localStorage.setItem('visibilitySettings', JSON.stringify(settings));
        alert('Visibility settings have been saved!');
    };

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6">Settings Page</h1>
            <p><strong>Current Role:</strong> {userRole}</p>

            <div className="mt-6 space-y-6">
                {/* Render Visibility Settings Section */}
                <VisibilitySettings onSave={handleSaveVisibilitySettings} />
            </div>
        </div>
    );
};

export default Settings;