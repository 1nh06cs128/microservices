import React, { useState, useEffect } from 'react'
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ childComponent }) => {
    const { user } = useAuth();

    if (!user) {
        // user is not authenticated
        return <Navigate to="/login" />;
    }

    return childComponent;
}

export default ProtectedRoute;