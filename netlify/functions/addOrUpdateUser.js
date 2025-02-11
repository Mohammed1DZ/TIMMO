exports.handler = async (event) => {
    try {
        const newUser = JSON.parse(event.body);

        // Simulate adding/updating a user (replace with actual database logic)
        console.log('User to add or update:', newUser);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User added/updated successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error adding/updating user' }),
        };
    }
};