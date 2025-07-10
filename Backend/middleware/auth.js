const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Auth middleware to verify JWT and attach user to request
const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        message: 'Access denied. No token provided.' 
      });
    }

    // Extract token
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Handle admin user (hardcoded)
    if (decoded.userId === 'admin' && decoded.role === 'admin') {
      req.user = {
        _id: 'admin',
        name: 'Administrator',
        email: 'admin@gameofficials.com',
        role: 'admin'
      };
      return next();
    }
    
    // Get user from database for regular users
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ 
        message: 'Invalid token. User not found.' 
      });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        message: 'Invalid token.' 
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: 'Token expired.' 
      });
    }
    console.error('Auth middleware error:', error);
    res.status(500).json({ 
      message: 'Server error during authentication.' 
    });
  }
};

// Role middleware to check if user has required role
const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        message: 'Authentication required.' 
      });
    }

    if (req.user.role !== requiredRole) {
      return res.status(403).json({ 
        message: `Access denied. ${requiredRole} role required.` 
      });
    }

    next();
  };
};

// Middleware to check if user has one of the required roles
const rolesMiddleware = (requiredRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        message: 'Authentication required.' 
      });
    }

    if (!requiredRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Access denied. One of these roles required: ${requiredRoles.join(', ')}` 
      });
    }

    next();
  };
};

module.exports = {
  authMiddleware,
  roleMiddleware,
  rolesMiddleware
}; 