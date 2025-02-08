import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import Clients from './pages/Clients';
import Agents from './pages/Agents';
import Settings from './pages/Settings';

function App() {
    return (
        <Router>
            <div className="flex">
                <Sidebar />
                <div className="flex-1 p-10 bg-gray-100 min-h-screen">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/properties" element={<Properties />} />
                        <Route path="/clients" element={<Clients />} />
                        <Route path="/agents" element={<Agents />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;