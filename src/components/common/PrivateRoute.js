import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, adminOnly }) => {
  const userToken = localStorage.getItem('token');
  const adminToken = localStorage.getItem('adminToken');

  if (adminOnly) {
    return adminToken ? children : <Navigate to="/admin/login" />;
  }

  return userToken ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
