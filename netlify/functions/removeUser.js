exports.handler = async (event) => {
    try {
        const { userId } = JSON.parse(event.body);

        // Simulate removing a user (replace with actual database logic)
        console.log('User to remove:', userId);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User removed successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error removing user' }),
        };
    }
};