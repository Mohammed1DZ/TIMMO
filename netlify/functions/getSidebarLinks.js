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
        let role;
        let updatedLinks;
        let action;

        // Check if the request method is GET (fetching links)
        if (event.httpMethod === "GET") {
            role = event.queryStringParameters?.role; // Get role from query params
        } 
        // If POST (updating links), parse the body
        else if (event.httpMethod === "POST" && event.body) {
            try {
                const parsedBody = JSON.parse(event.body);
                role = parsedBody.role;
                updatedLinks = parsedBody.updatedLinks;
                action = parsedBody.action;
                console.log('DEBUG: Parsed Request Body:', parsedBody);
            } catch (jsonError) {
                console.error('DEBUG: JSON Parsing Error:', jsonError);
                return {
                    statusCode: 400,
                    headers: { 'Access-Control-Allow-Origin': '*' },
                    body: JSON.stringify({ message: 'Invalid JSON input.', error: jsonError.message })
                };
            }
        }

        // Validate role
        if (!role || !linksDatabase[role]) {
            console.warn('DEBUG: Invalid or missing role.');
            return {
                statusCode: 400,
                headers: { 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ message: 'Invalid or missing role provided.' })
            };
        }

        // Handle update action for POST requests
        if (event.httpMethod === "POST" && action === 'update') {
            if (!updatedLinks || !Array.isArray(updatedLinks)) {
                return {
                    statusCode: 400,
                    headers: { 'Access-Control-Allow-Origin': '*' },
                    body: JSON.stringify({ message: 'Invalid or missing updated links.' })
                };
            }

            console.log('DEBUG: Updating links for role:', role);
            linksDatabase[role] = updatedLinks;

            return {
                statusCode: 200,
                headers: { 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ message: 'Links updated successfully.' })
            };
        }

        // Default: Fetch the sidebar links for the given role
        console.log('DEBUG: Fetching links for role:', role);
        return {
            statusCode: 200,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ links: linksDatabase[role] })
        };

    } catch (error) {
        console.error('DEBUG: Unexpected Error:', error);
        return {
            statusCode: 500,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ message: 'Failed to handle sidebar links.', error: error.message })
        };
    }
};
