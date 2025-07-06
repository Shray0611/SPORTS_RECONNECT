// JWT utility functions for frontend token handling

// Decode JWT token (base64 decode the payload)
export const decodeToken = (token) => {
  try {
    // Split the token and get the payload part
    const payload = token.split('.')[1];
    
    if (!payload) {
      throw new Error('Invalid token format');
    }
    
    // Decode base64 and parse JSON
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload;
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null;
  }
};

// Get user role from token
export const getUserRole = (token) => {
  const decoded = decodeToken(token);
  return decoded ? decoded.role : null;
};

// Get user ID from token
export const getUserId = (token) => {
  const decoded = decodeToken(token);
  return decoded ? decoded.userId : null;
};

// Check if token is expired
export const isTokenExpired = (token) => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;
  
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
};

// Get token expiration time
export const getTokenExpiration = (token) => {
  const decoded = decodeToken(token);
  return decoded ? decoded.exp : null;
};

// Validate token structure
export const isValidToken = (token) => {
  if (!token || typeof token !== 'string') return false;
  
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  
  const decoded = decodeToken(token);
  return decoded && decoded.userId && decoded.role;
};

// Get redirect path based on role
export const getRedirectPath = (role) => {
  switch (role) {
    case 'official':
      return '/official/dashboard';
    case 'organizer':
      return '/organizer/dashboard';
    case 'admin':
      return '/admin';
    default:
      return '/login';
  }
};

// Check if user has required role
export const hasRole = (token, requiredRole) => {
  const userRole = getUserRole(token);
  return userRole === requiredRole;
};

// Check if user has one of the required roles
export const hasAnyRole = (token, requiredRoles) => {
  const userRole = getUserRole(token);
  return requiredRoles.includes(userRole);
};

// Get user info from token
export const getUserInfo = (token) => {
  const decoded = decodeToken(token);
  if (!decoded) return null;
  
  return {
    userId: decoded.userId,
    role: decoded.role,
    exp: decoded.exp,
    iat: decoded.iat
  };
}; 