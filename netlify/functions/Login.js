exports.handler = async (event) => {
    const { email, password } = JSON.parse(event.body);

    // Replace this with actual validation logic (like database checks)
    const validUser = {
        email: "mohammedfreehali@gmail.com",
        password: "lpl$hghldk3113"
    };

    if (email === validUser.email && password === validUser.password) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Login successful",
                userRole: "Super Admin" // Adjust this based on user type
            })
        };
    } else {
        return {
            statusCode: 401,
            body: JSON.stringify({ message: "Invalid email or password" })
        };
    }
};