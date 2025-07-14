import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import apiService from "../services/api";
import {
  decodeToken,
  getRedirectPath,
  isTokenExpired,
  hasAnyRole,
} from "../utils/jwt";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = apiService.getToken();

        if (!token) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        // Check if token is expired
        if (isTokenExpired(token)) {
          console.log("Token expired, logging out");
          apiService.removeToken();
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        // Decode token to get user info
        const decodedToken = decodeToken(token);
        if (!decodedToken || !decodedToken.role) {
          console.log("Invalid token, logging out");
          apiService.removeToken();
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        // Verify token by getting current user from API
        try {
          const response = await apiService.getCurrentUser();
          setUser(response.user);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Token verification failed:", error);
          // Token is invalid, remove it
          apiService.removeToken();
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        // Token is invalid, remove it
        apiService.removeToken();
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [location.pathname]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }

  // Check role-based access if roles are specified
  if (allowedRoles.length > 0 && user) {
    const token = apiService.getToken();

    // Check if user has any of the required roles
    if (!hasAnyRole(token, allowedRoles)) {
      // Redirect to appropriate dashboard based on user role
      const userRole = user.role;
      const redirectPath = getRedirectPath(userRole);

      return <Navigate to={redirectPath} replace />;
    }
  }

  // Render the protected component
  return children;
};

export default ProtectedRoute;
