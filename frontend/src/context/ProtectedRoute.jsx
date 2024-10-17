// src/context/ProtectedRoute.js
import React,{useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  

  if (!token) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return children; // Render children if authenticated
};

export default ProtectedRoute;
