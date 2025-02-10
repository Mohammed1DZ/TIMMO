import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import Clients from './pages/Clients';
import Agents from './pages/Agents';
import Settings from './pages/Settings';
import Login from './pages/Login';

function App() {
    const [userRole, setUserRole] = useState(null);  // Track the logged-in user's role

    const isAuthenticated = userRole !== null;  // Check if user is authenticated

    return (
        <Router>
            <div className="flex h-screen">
                {/* Only show sidebar if authenticated */}
                {isAuthenticated && <Sidebar userRole={userRole} />}

                {/* Main content */}
                <div className="flex-1 p-8 md:p-6 bg-gray-100 overflow-auto">
                    <Routes>
                        {/* Login route */}
                        <Route path="/login" element={<Login setUserRole={setUserRole} />} />

                        {/* Protected routes */}
                        {isAuthenticated ? (
                            <>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/properties" element={<Properties />} />
                                <Route path="/clients" element={<Clients />} />
                                <Route path="/agents" element={<Agents />} />
                                <Route path="/settings" element={<Settings />} />
                            </>
                        ) : (
                            // Redirect to login if not authenticated
                            <Route path="*" element={<Navigate to="/login" />} />
                        )}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;