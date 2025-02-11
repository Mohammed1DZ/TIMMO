exports.handler = async () => {
    try {
        const users = [
            {
                id: "1",
                name: "Super Admin",
                email: "superadmin@example.com",
                role: "Super Admin",
                permissions: ["dashboard", "settings"]
            },
            {
                id: "2",
                name: "Agent User",
                email: "agent@example.com",
                role: "Agent",
                permissions: ["properties", "clients"]
            }
        ];

        return {
            statusCode: 200,
            body: JSON.stringify(users),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error fetching users' }),
        };
    }
};