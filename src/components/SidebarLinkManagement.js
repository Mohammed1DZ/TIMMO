import React, { useEffect, useState } from 'react';

const SidebarLinkManagement = ({ userRole }) => {
    const [links, setLinks] = useState([]);
    const [newLink, setNewLink] = useState({ path: '', label: '', icon: '' });

    // Fetch existing sidebar links from the backend on mount
    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const response = await fetch('https://your-app-name.netlify.app/.netlify/functions/getSidebarLinks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ role: userRole })
                });
                const data = await response.json();
                setLinks(data.links);
            } catch (error) {
                console.error('Error fetching links:', error);
            }
        };

        fetchLinks();
    }, [userRole]);

    // Handle input changes for new link
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLink((prev) => ({ ...prev, [name]: value }));
    };

    // Add a new sidebar link
    const handleAddLink = async () => {
        if (newLink.path && newLink.label && newLink.icon) {
            const updatedLinks = [...links, newLink];
            setLinks(updatedLinks);  // Update locally

            // Send update to the backend
            await fetch('https://your-app-name.netlify.app/.netlify/functions/updateSidebarLinks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ role: userRole, updatedLinks })
            });

            // Clear input fields
            setNewLink({ path: '', label: '', icon: '' });
        } else {
            alert('Please fill all fields before adding a new link.');
        }
    };

    // Remove a link from the list
    const handleRemoveLink = async (index) => {
        const updatedLinks = links.filter((_, i) => i !== index);
        setLinks(updatedLinks);

        // Send update to the backend
        await fetch('https://your-app-name.netlify.app/.netlify/functions/updateSidebarLinks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role: userRole, updatedLinks })
        });
    };

    return (
        <div>
            <h3>Manage Sidebar Links for {userRole}</h3>
            
            {/* Current Links */}
            <ul>
                {links.map((link, index) => (
                    <li key={index}>
                        {link.label} ({link.path}) - Icon: {link.icon}
                        <button onClick={() => handleRemoveLink(index)} style={{ marginLeft: '10px' }}>
                            Remove
                        </button>
                    </li>
                ))}
            </ul>

            <h4>Add New Link</h4>
            <div>
                <input
                    type="text"
                    name="path"
                    placeholder="Path (e.g., /new-page)"
                    value={newLink.path}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="label"
                    placeholder="Label (e.g., New Page)"
                    value={newLink.label}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="icon"
                    placeholder="Icon (e.g., FaHome)"
                    value={newLink.icon}
                    onChange={handleInputChange}
                />
                <button onClick={handleAddLink}>Add Link</button>
            </div>
        </div>
    );
};

export default SidebarLinkManagement;