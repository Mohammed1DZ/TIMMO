const linksDatabase = {
    "Super Admin": [
        { path: "/", label: "Dashboard", icon: "FaHome" },
        { path: "/properties", label: "Properties", icon: "FaBuilding" },
        { path: "/clients", label: "Clients", icon: "FaUsers" },
        { path: "/agents", label: "Agents", icon: "FaUserTie" },
        { path: "/settings", label: "Settings", icon: "FaCogs" }
    ],
    "Admin": [
        { path: "/", label: "Dashboard", icon: "FaHome" },
        { path: "/properties", label: "Properties", icon: "FaBuilding" },
        { path: "/clients", label: "Clients", icon: "FaUsers" },
        { path: "/agents", label: "Agents", icon: "FaUserTie" }
    ],
    "Agent": [
        { path: "/", label: "Dashboard", icon: "FaHome" },
        { path: "/properties", label: "Properties", icon: "FaBuilding" }
    ]
};

exports.handler = async (event) => {
    try {
        const { role, updatedLinks, action } = JSON.parse(event.body);

        if (action === 'update') {
            // Update the in-memory links (replace this with database logic in production)
            linksDatabase[role] = updatedLinks;
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Links updated successfully.' })
            };
        } else {
            // Return the links for the given role
            const links = linksDatabase[role] || [];
            return {
                statusCode: 200,
                body: JSON.stringify({ links })
            };
        }
    } catch (error) {
        console.error('Error handling sidebar links:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to handle sidebar links.' })
        };
    }
};