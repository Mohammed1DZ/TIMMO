import React, { useState } from 'react';

const SidebarLinkManager = ({ sidebarLinks, onSidebarUpdate }) => {
    const [newLink, setNewLink] = useState({ path: '', label: '', icon: '' });

    const handleAddLink = () => {
        const updatedLinks = [...sidebarLinks, newLink];
        onSidebarUpdate(updatedLinks);
        setNewLink({ path: '', label: '', icon: '' });  // Reset form
    };

    const handleRemoveLink = (index) => {
        const updatedLinks = sidebarLinks.filter((_, i) => i !== index);
        onSidebarUpdate(updatedLinks);
    };

    return (
        <div>
            <h3 className="text-lg font-bold mb-2">Add or Remove Sidebar Links</h3>
            <input
                type="text"
                placeholder="Path"
                value={newLink.path}
                onChange={(e) => setNewLink({ ...newLink, path: e.target.value })}
                className="border p-2 rounded mr-2"
            />
            <input
                type="text"
                placeholder="Label"
                value={newLink.label}
                onChange={(e) => setNewLink({ ...newLink, label: e.target.value })}
                className="border p-2 rounded mr-2"
            />
            <input
                type="text"
                placeholder="Icon"
                value={newLink.icon}
                onChange={(e) => setNewLink({ ...newLink, icon: e.target.value })}
                className="border p-2 rounded mr-2"
            />
            <button onClick={handleAddLink} className="bg-blue-500 text-white p-2 rounded">
                Add Link
            </button>

            <ul className="mt-4">
                {sidebarLinks.map((link, index) => (
                    <li key={index} className="flex justify-between border p-2 rounded mb-2">
                        <span>
                            {link.label} - {link.path}
                        </span>
                        <button
                            onClick={() => handleRemoveLink(index)}
                            className="bg-red-500 text-white p-1 rounded"
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SidebarLinkManager;