// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check if user is logged in by looking for the accessToken
  const token = localStorage.getItem("accessToken");

  if (!token) {
    // If no token found, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If token exists, render the protected component
  return children;
};

export default ProtectedRoute;
