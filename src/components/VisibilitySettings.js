import React, { useState } from 'react';

// Initial visibility settings (default state)
const initialVisibilitySettings = {
    fieldAgent: {
        showEditButton: false,
        showDeleteButton: false,
    },
    insideAgent: {
        showEditButton: false,
        showDeleteButton: false,
    },
    admin: {
        showEditButton: true,
        showDeleteButton: true,
    },
};

const VisibilitySettings = ({ onSave }) => {
    const [visibilitySettings, setVisibilitySettings] = useState(initialVisibilitySettings);

    // Toggle the visibility for a specific role and button type
    const handleToggle = (role, setting) => {
        setVisibilitySettings((prev) => ({
            ...prev,
            [role]: {
                ...prev[role],
                [setting]: !prev[role][setting],
            },
        }));
    };

    const handleSaveSettings = () => {
        onSave(visibilitySettings);
        alert('Visibility settings have been saved!');
    };

    return (
        <div className="bg-gray-100 p-6 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Visibility Settings</h2>

            {/* Visibility controls for each role */}
            {Object.keys(visibilitySettings).map((role) => (
                <div key={role} className="mb-6">
                    <h3 className="text-xl font-semibold capitalize">{role.replace(/([A-Z])/g, ' $1')} Visibility</h3>
                    <div className="space-y-2">
                        <label className="block">
                            <input
                                type="checkbox"
                                checked={visibilitySettings[role].showEditButton}
                                onChange={() => handleToggle(role, 'showEditButton')}
                            />
                            <span className="ml-2">Show Edit Button</span>
                        </label>

                        <label className="block">
                            <input
                                type="checkbox"
                                checked={visibilitySettings[role].showDeleteButton}
                                onChange={() => handleToggle(role, 'showDeleteButton')}
                            />
                            <span className="ml-2">Show Delete Button</span>
                        </label>
                    </div>
                </div>
            ))}

            <button onClick={handleSaveSettings} className="bg-blue-500 text-white px-4 py-2 rounded">
                Save Settings
            </button>
        </div>
    );
};

export default VisibilitySettings;