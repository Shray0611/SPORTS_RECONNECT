import apiService from '../services/api';

// Logout function
export const logout = () => {
  apiService.logout();
};

// Get current user info from localStorage or API
export const getCurrentUser = async () => {
  try {
    const response = await apiService.getCurrentUser();
    return response.user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return apiService.isAuthenticated();
};

// Get user role
export const getUserRole = async () => {
  try {
    const user = await getCurrentUser();
    return user ? user.role : null;
  } catch (error) {
    return null;
  }
};

// Check if user has specific role
export const hasRole = async (role) => {
  try {
    const userRole = await getUserRole();
    return userRole === role;
  } catch (error) {
    return false;
  }
};

// Get token
export const getToken = () => {
  return apiService.getToken();
};

// Set token
export const setToken = (token) => {
  apiService.setToken(token);
}; 