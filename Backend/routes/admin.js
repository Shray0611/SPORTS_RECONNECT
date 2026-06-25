const express = require('express');
const jwt = require('jsonwebtoken');
const { authMiddleware, rolesMiddleware } = require('../middleware/auth');

const router = express.Router();

// Hardcoded admin credentials
const ADMIN_EMAIL = 'admin@sportsreconnect.com';
const ADMIN_PASSWORD = 'admin123456';

// Admin login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check hardcoded admin credentials
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    // Generate JWT token for admin
    const token = jwt.sign(
      { 
        userId: 'admin', 
        role: 'admin',
        email: ADMIN_EMAIL 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Admin login successful',
      user: {
        name: 'System Administrator',
        email: ADMIN_EMAIL,
        role: 'admin'
      },
      token
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Protected admin route - requires admin role
router.get('/dashboard', authMiddleware, rolesMiddleware(['admin']), async (req, res) => {
  try {
    res.json({
      message: 'Welcome to admin dashboard',
      user: req.user,
      adminData: {
        totalUsers: 'This would be fetched from database',
        systemStats: 'This would contain system statistics'
      }
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all users (admin only)
router.get('/users', authMiddleware, rolesMiddleware(['admin']), async (req, res) => {
  try {
    const User = require('../models/User');
    const users = await User.find({}).select('-password');
    
    res.json({
      message: 'Users retrieved successfully',
      users
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all officials (admin only)
router.get('/officials', authMiddleware, rolesMiddleware(['admin']), async (req, res) => {
  try {
    const User = require('../models/User');
    const officials = await User.find({ role: 'official' }).select('-password');
    res.json({
      message: 'Officials retrieved successfully',
      officials
    });
  } catch (error) {
    console.error('Get officials error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all pending users (officials and organizers) (admin only)
router.get('/officials/pending', authMiddleware, rolesMiddleware(['admin']), async (req, res) => {
  try {
    const User = require('../models/User');
    const pendingUsers = await User.find({ role: { $in: ['official', 'organizer'] }, approvalStatus: 'pending' }).select('-password');
    res.json({
      message: 'Pending users retrieved successfully',
      officials: pendingUsers
    });
  } catch (error) {
    console.error('Get pending officials error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Approve a user (official/organizer) (admin only)
router.patch('/officials/:id/approve', authMiddleware, rolesMiddleware(['admin']), async (req, res) => {
  try {
    const User = require('../models/User');
    const user = await User.findOneAndUpdate(
      { _id: req.params.id, role: { $in: ['official', 'organizer'] } },
      { approvalStatus: 'approved' },
      { new: true }
    ).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User approved successfully', official: user });
  } catch (error) {
    console.error('Approve official error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Decline a user (official/organizer) (admin only)
router.patch('/officials/:id/decline', authMiddleware, rolesMiddleware(['admin']), async (req, res) => {
  try {
    const User = require('../models/User');
    const user = await User.findOneAndUpdate(
      { _id: req.params.id, role: { $in: ['official', 'organizer'] } },
      { approvalStatus: 'rejected' },
      { new: true }
    ).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User declined successfully', official: user });
  } catch (error) {
    console.error('Decline official error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 