import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mocked user data for demo purposes (this will be replaced with backend authentication)
const mockUsers = [
    { email: 'superadmin@example.com', password: 'superadmin123', role: 'Super Admin' },
    { email: 'admin@example.com', password: 'admin123', role: 'Admin' },
    { email: 'agent@example.com', password: 'agent123', role: 'Agent' }
];

const Login = ({ setUserRole }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Find the matching user in the mock data
        const user = mockUsers.find(
            (u) => u.email === email && u.password === password
        );

        if (user) {
            // Set user role and redirect to dashboard
            setUserRole(user.role);
            navigate('/');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Login</h2>

                {error && <p className="text-red-500">{error}</p>}

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;