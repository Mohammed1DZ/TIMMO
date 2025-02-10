import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import Clients from './pages/Clients';
import Agents from './pages/Agents';
import Settings from './pages/Settings';
import SuperAdminProfile from './pages/SuperAdminProfile';  // Import the new component

function App() {
    const [agents, setAgents] = useState([]);  // Centralized agent state
    const [user, setUser] = useState({ name: 'John Doe', email: 'superadmin@example.com' });

    const addAgent = (newAgent) => {
        setAgents((prevAgents) => [...prevAgents, newAgent]);
    };

    const updateProfile = (updatedProfile) => {
        setUser((prevUser) => ({ ...prevUser, ...updatedProfile }));
        alert('Profile updated successfully!');
    };

    const logout = () => {
        alert('Logged out successfully.');
        // Implement actual logout logic here (e.g., clear authentication tokens)
    };

    return (
        <Router>
            <div className="flex h-screen">
                {/* Sidebar */}
                <Sidebar />

                {/* Main content */}
                <div className="flex-1 p-8 md:p-6 bg-gray-100 overflow-auto">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/properties" element={<Properties />} />
                        <Route path="/clients" element={<Clients />} />
                        <Route 
                            path="/agents" 
                            element={<Agents agents={agents} addAgent={addAgent} />} 
                        />
                        <Route path="/settings" element={<Settings />} />
                        <Route 
                            path="/super-admin-profile" 
                            element={
                                <SuperAdminProfile 
                                    user={user} 
                                    onUpdateProfile={updateProfile} 
                                    onLogout={logout} 
                                />
                            } 
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;