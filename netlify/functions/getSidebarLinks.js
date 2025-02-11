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
    console.log('DEBUG: Incoming Request:', event);  // Log the full event

    try {
        // Ensure we have a body and parse it safely
        if (!event.body) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({ message: 'Request body is missing.' })
            };
        }

        let parsedBody;
        try {
            parsedBody = JSON.parse(event.body);
        } catch (jsonError) {
            console.error('DEBUG: JSON Parsing Error:', jsonError);
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({ message: 'Invalid JSON input.', error: jsonError.message })
            };
        }

        const { role, updatedLinks, action } = parsedBody;
        console.log('DEBUG: Parsed Request Body:', parsedBody);

        // Validate role
        if (!role || !linksDatabase[role]) {
            console.warn('DEBUG: Invalid or missing role.');
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({ message: 'Invalid or missing role provided.' })
            };
        }

        // Handle update action
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

            console.log('DEBUG: Updating links for role:', role);
            linksDatabase[role] = updatedLinks;

            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({ message: 'Links updated successfully.' })
            };
        } else {
            console.log('DEBUG: Fetching links for role:', role);
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
        console.error('DEBUG: Unexpected Error:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                message: 'Failed to handle sidebar links.',
                error: error.message
            })
        };
    }
};