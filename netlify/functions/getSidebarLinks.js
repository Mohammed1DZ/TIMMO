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
        console.log('Received request:', event.body);  // Debugging request payload
        
        // Parse request safely with fallback for empty/undefined body
        const parsedBody = event.body ? JSON.parse(event.body) : {};
        const { role, updatedLinks, action } = parsedBody;

        if (!role || !linksDatabase[role]) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({ message: 'Invalid or missing role provided.' })
            };
        }

        if (action === 'update') {
            if (!updatedLinks || !Array.isArray(updatedLinks)) {
                return {
                    statusCode: 400,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                    body: JSON.stringify({ message: 'Invalid or missing updated links.' })
                };
            }

            console.log('Updating links for role:', role);  // Debug update action
            linksDatabase[role] = updatedLinks;  // Update in-memory data (replace in production)

            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({ message: 'Links updated successfully.' })
            };
        } else {
            console.log('Fetching links for role:', role);  // Debug fetch action
            const links = linksDatabase[role];

            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({ links })
            };
        }
    } catch (error) {
        console.error('Error handling sidebar links:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                message: 'Failed to handle sidebar links.',
                error: error.message || 'Internal Server Error'
            })
        };
    }
};