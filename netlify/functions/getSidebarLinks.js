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
        const { role, updatedLinks } = JSON.parse(event.body);

        // Update the in-memory links (replace this with database logic in production)
        linksDatabase[role] = updatedLinks;

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Links updated successfully.' })
        };
    } catch (error) {
        console.error('Error updating sidebar links:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to update links.' })
        };
    }
};