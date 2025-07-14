const express = require('express');
const { authMiddleware, roleMiddleware, rolesMiddleware } = require('../middleware/auth');
const BookingRequest = require('../models/BookingRequest');

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

// Organizer: Create a booking request for an official
router.post('/booking', authMiddleware, roleMiddleware('organizer'), async (req, res) => {
  try {
    const { officialId, event, message } = req.body;
    if (!officialId || !event || !event.name || !event.date || !event.location || !event.sport) {
      return res.status(400).json({ message: 'Missing required booking details' });
    }
    const booking = new BookingRequest({
      organizer: req.user._id,
      official: officialId,
      event,
      message,
      status: 'pending',
    });
    await booking.save();
    res.status(201).json({ message: 'Booking request sent', booking });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Organizer: View all booking requests they have made
router.get('/booking/sent', authMiddleware, roleMiddleware('organizer'), async (req, res) => {
  try {
    const bookings = await BookingRequest.find({ organizer: req.user._id })
      .populate('official', '-password')
      .sort({ createdAt: -1 });
    res.json({ bookings });
  } catch (error) {
    console.error('Get sent bookings error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Official: View all incoming booking requests
router.get('/booking/received', authMiddleware, roleMiddleware('official'), async (req, res) => {
  try {
    const bookings = await BookingRequest.find({ official: req.user._id })
      .populate('organizer', '-password')
      .sort({ createdAt: -1 });
    res.json({ bookings });
  } catch (error) {
    console.error('Get received bookings error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Official: Accept or reject a booking request
router.patch('/booking/:id', authMiddleware, roleMiddleware('official'), async (req, res) => {
  try {
    const { status } = req.body;
    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const booking = await BookingRequest.findOne({ _id: req.params.id, official: req.user._id });
    if (!booking) {
      return res.status(404).json({ message: 'Booking request not found' });
    }
    booking.status = status;
    await booking.save();
    res.json({ message: `Booking request ${status}`, booking });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Route for organizers to get all officials
router.get('/officials', authMiddleware, roleMiddleware('organizer'), async (req, res) => {
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

module.exports = router; 