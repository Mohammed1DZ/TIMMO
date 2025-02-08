import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import Clients from './pages/Clients';
import Agents from './pages/Agents';
import Settings from './pages/Settings';

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <Router>
            <div className="flex">
                {/* Sidebar */}
                <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

                {/* Mobile menu button */}
                <button
                    className="lg:hidden p-4 bg-blue-700 text-white fixed top-0 left-0 z-20"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    Menu
                </button>

                {/* Main content */}
                <div
                    className={`flex-1 p-10 bg-gray-100 min-h-screen transition-all duration-300 ${
                        sidebarOpen ? 'ml-64' : 'ml-0 lg:ml-64'
                    }`}
                >
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