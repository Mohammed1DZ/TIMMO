exports.handler = async (event) => {
    const { email, password } = JSON.parse(event.body);
    
    if (email === "mohammedfreehali@gmail.com" && password === "123456789") {
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Login successful", role: "Super Admin" })
        };
    }

    return {
        statusCode: 401,
        body: JSON.stringify({ message: "Invalid credentials" })
    };
};
