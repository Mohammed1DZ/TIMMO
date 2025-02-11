exports.handler = async (event) => {
    try {
        // Parse incoming request
        const { role } = JSON.parse(event.body);

        // Sidebar links based on roles
        const sidebarLinks = {
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

        // Return links based on role
        const links = sidebarLinks[role] || [];

        return {
            statusCode: 200,
            body: JSON.stringify({ links })
        };
    } catch (error) {
        console.error('Error fetching sidebar links:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to fetch sidebar links.' })
        };
    }
};