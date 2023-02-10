import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/context";

const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();
  if (!user) {
    return <Navigate to="/register" />;
  }
  return children;
};

export default ProtectedRoute;
