import React, { useState, useEffect } from 'react';

const SidebarLinkManagement = () => {
    const [links, setLinks] = useState(
        JSON.parse(localStorage.getItem('sidebarLinks')) || []  // Load saved links
    );

    const [newLink, setNewLink] = useState({
        label: '',
        path: '',
        roles: [],
    });

    const availableRoles = ['Super Admin', 'Admin', 'Agent'];

    useEffect(() => {
        // Persist links to localStorage whenever they change
        localStorage.setItem('sidebarLinks', JSON.stringify(links));
    }, [links]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLink({ ...newLink, [name]: value });
    };

    const handleRoleToggle = (role) => {
        setNewLink((prev) => ({
            ...prev,
            roles: prev.roles.includes(role)
                ? prev.roles.filter((r) => r !== role)  // Remove role if already selected
                : [...prev.roles, role],  // Add role if not selected
        }));
    };

    const handleAddLink = () => {
        if (!newLink.label || !newLink.path) {
            alert('Please provide both a label and path.');
            return;
        }
        setLinks([...links, { ...newLink }]);
        setNewLink({ label: '', path: '', roles: [] });
        alert('Sidebar link added successfully!');
    };

    const handleDeleteLink = (index) => {
        const updatedLinks = links.filter((_, i) => i !== index);
        setLinks(updatedLinks);
    };

    return (
        <div>
            <h3 className="text-xl font-bold mb-4">Manage Sidebar Links</h3>

            {/* New Link Form */}
            <div className="mb-4 p-4 bg-gray-100 rounded">
                <h4 className="font-semibold mb-2">Add New Link</h4>

                <div className="mb-2">
                    <label className="block text-gray-700">Link Label</label>
                    <input
                        type="text"
                        name="label"
                        value={newLink.label}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter link label"
                        required
                    />
                </div>

                <div className="mb-2">
                    <label className="block text-gray-700">Link Path</label>
                    <input
                        type="text"
                        name="path"
                        value={newLink.path}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        placeholder="/path"
                        required
                    />
                </div>

                <div className="mb-2">
                    <label className="block text-gray-700">Select Roles</label>
                    {availableRoles.map((role) => (
                        <label key={role} className="inline-flex items-center mr-4">
                            <input
                                type="checkbox"
                                checked={newLink.roles.includes(role)}
                                onChange={() => handleRoleToggle(role)}
                                className="mr-2"
                            />
                            {role}
                        </label>
                    ))}
                </div>

                <button
                    onClick={handleAddLink}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Add Link
                </button>
            </div>

            {/* Display Existing Links */}
            <h4 className="font-semibold mt-6 mb-2">Existing Links</h4>
            {links.length === 0 ? (
                <p>No links added yet.</p>
            ) : (
                <ul className="space-y-2">
                    {links.map((link, index) => (
                        <li key={index} className="flex justify-between items-center border p-2 rounded">
                            <div>
                                <p><strong>Label:</strong> {link.label}</p>
                                <p><strong>Path:</strong> {link.path}</p>
                                <p><strong>Visible to:</strong> {link.roles.join(', ')}</p>
                            </div>
                            <button
                                onClick={() => handleDeleteLink(index)}
                                className="bg-red-500 text-white p-2 rounded"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SidebarLinkManagement;