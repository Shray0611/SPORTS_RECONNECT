const express = require('express');
const { authMiddleware, roleMiddleware, rolesMiddleware } = require('../middleware/auth');

const router = express.Router();

// Route accessible by all authenticated users
router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({
    message: 'Welcome to your dashboard',
    user: req.user,
    dashboard: 'General Dashboard'
  });
});

// Route accessible only by officials
router.get('/official/dashboard', authMiddleware, roleMiddleware('official'), (req, res) => {
  res.json({
    message: 'Welcome to Official Dashboard',
    user: req.user,
    dashboard: 'Official Dashboard',
    features: [
      'Manage availability',
      'View booking requests',
      'Update profile',
      'View earnings'
    ]
  });
});

// Route accessible only by organizers
router.get('/organizer/dashboard', authMiddleware, roleMiddleware('organizer'), (req, res) => {
  res.json({
    message: 'Welcome to Organizer Dashboard',
    user: req.user,
    dashboard: 'Organizer Dashboard',
    features: [
      'Search officials',
      'Book officials',
      'Manage events',
      'View booking history'
    ]
  });
});

// Route accessible only by admins
router.get('/admin', authMiddleware, roleMiddleware('admin'), (req, res) => {
  res.json({
    message: 'Welcome to Admin Panel',
    user: req.user,
    dashboard: 'Admin Panel',
    features: [
      'Manage users',
      'View system statistics',
      'Monitor bookings',
      'System settings'
    ]
  });
});

// Route accessible by both officials and organizers
router.get('/booking', authMiddleware, rolesMiddleware(['official', 'organizer']), (req, res) => {
  res.json({
    message: 'Booking Management',
    user: req.user,
    access: 'Booking features available',
    role: req.user.role
  });
});

// Route accessible by organizers and admins
router.get('/management', authMiddleware, rolesMiddleware(['organizer', 'admin']), (req, res) => {
  res.json({
    message: 'Management Panel',
    user: req.user,
    access: 'Management features available',
    role: req.user.role
  });
});

module.exports = router; 