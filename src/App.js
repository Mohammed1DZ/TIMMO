import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import Clients from './pages/Clients';
import Agents from './pages/Agents';
import Settings from './pages/Settings';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
    const [agents, setAgents] = useState([]);  // Centralized agent state

    const addAgent = (newAgent) => {
        setAgents((prevAgents) => [...prevAgents, newAgent]);
    };

    return (
        <Router>
            <Routes>
                {/* Public Route */}
                <Route path="/login" element={<Login />} />

                {/* Protected Routes */}
                <Route
                    path="/*"
                    element={
                        <PrivateRoute>
                            <div className="flex h-screen">
                                <Sidebar />
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
                                    </Routes>
                                </div>
                            </div>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;