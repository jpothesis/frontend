import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // ✅ Grab token from localStorage
  const token = localStorage.getItem("accessToken");

  if (!token || token === "undefined" || token === "null") {
    // If no valid token, redirect to login
    return <Navigate to="/login" replace />;
  }

  // Token exists → allow access
  return children;
};

export default ProtectedRoute;
