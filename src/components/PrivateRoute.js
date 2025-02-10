import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const userRole = localStorage.getItem('userRole');

    return userRole ? children : <Navigate to="/login" />;
};

export default PrivateRoute;