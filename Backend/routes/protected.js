const express = require('express');
const { authMiddleware, roleMiddleware, rolesMiddleware } = require('../middleware/auth');
const BookingRequest = require('../models/BookingRequest');
const nodemailer = require('nodemailer');

// Email utility
const sendMail = async ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject,
    text,
    html,
  });
};

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

    const Availability = require("../models/Availability");
    const bookingDate = new Date(event.date);
    if (isNaN(bookingDate.getTime())) {
      return res.status(400).json({ message: 'Invalid event date and time' });
    }

    const availability = await Availability.findOne({
      official: officialId,
      status: "available",
      startDate: { $lte: bookingDate },
      endDate: { $gte: bookingDate },
    });

    if (!availability) {
      return res.status(400).json({ message: "This official is not available on the selected date and time." });
    }

    const booking = new BookingRequest({
      organizer: req.user._id,
      official: officialId,
      event,
      message,
      status: 'pending',
    });
    await booking.save();

    // Send email to official
    const User = require('../models/User');
    const official = await User.findById(officialId);
    if (official && official.email) {
      await sendMail({
        to: official.email,
        subject: `New Booking Request for ${event.name}`,
        text: `You have received a new booking request for ${event.name} (${event.sport}) on ${event.date} at ${event.location} from ${req.user.name} (${req.user.email}).\nMessage: ${message || 'No message provided.'}`,
        html: `<p>You have received a new booking request for <b>${event.name}</b> (${event.sport}) on <b>${event.date}</b> at <b>${event.location}</b> from <b>${req.user.name}</b> (${req.user.email}).</p><p><b>Message:</b> ${message || 'No message provided.'}</p>`
      });
    }
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

// Organizer: Edit a pending booking request
router.put('/booking/:id', authMiddleware, roleMiddleware('organizer'), async (req, res) => {
  try {
    const { event, message } = req.body;
    const booking = await BookingRequest.findOne({ _id: req.params.id, organizer: req.user._id });
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking request not found' });
    }
    
    if (booking.status !== 'pending') {
      return res.status(400).json({ message: 'Only pending bookings can be edited' });
    }

    // Validate new availability
    if (event && event.date) {
      const Availability = require("../models/Availability");
      const bookingDate = new Date(event.date);
      if (isNaN(bookingDate.getTime())) {
        return res.status(400).json({ message: 'Invalid event date and time' });
      }

      const availability = await Availability.findOne({
        official: booking.official,
        status: "available",
        startDate: { $lte: bookingDate },
        endDate: { $gte: bookingDate },
      });

      if (!availability) {
        return res.status(400).json({ message: "This official is not available on the newly selected date and time." });
      }
    }

    if (event) {
      booking.event = { ...booking.event, ...event };
    }
    if (message !== undefined) {
      booking.message = message;
    }

    await booking.save();
    res.json({ message: 'Booking request updated successfully', booking });
  } catch (error) {
    console.error('Edit booking error:', error);
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
    const booking = await BookingRequest.findOne({ _id: req.params.id, official: req.user._id }).populate('organizer', '-password');
    if (!booking) {
      return res.status(404).json({ message: 'Booking request not found' });
    }
    booking.status = status;
    await booking.save();
    // Send email to organizer if accepted
    if (status === 'accepted') {
      if (booking.organizer && booking.organizer.email) {
        await sendMail({
          to: booking.organizer.email,
          subject: `Booking Accepted: ${booking.event.name}`,
          text: `Your booking request for ${booking.event.name} (${booking.event.sport}) on ${booking.event.date} at ${booking.event.location} has been accepted by ${req.user.name} (${req.user.email}).`,
          html: `<p>Your booking request for <b>${booking.event.name}</b> (${booking.event.sport}) on <b>${booking.event.date}</b> at <b>${booking.event.location}</b> has been <b>accepted</b> by <b>${req.user.name}</b> (${req.user.email}).</p>`
        });
      }
      
      if (req.user.email) {
        await sendMail({
          to: req.user.email,
          subject: `Booking Confirmed: ${booking.event.name}`,
          text: `You have successfully accepted the booking request for ${booking.event.name} (${booking.event.sport}) on ${booking.event.date} at ${booking.event.location}. Organizer: ${booking.organizer ? booking.organizer.name : 'Unknown'}.`,
          html: `<p>You have successfully <b>accepted</b> the booking request for <b>${booking.event.name}</b> (${booking.event.sport}) on <b>${booking.event.date}</b> at <b>${booking.event.location}</b>. Organizer: <b>${booking.organizer ? booking.organizer.name : 'Unknown'}</b>.</p>`
        });
      }
    }
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
    const { getOfficialStats } = require('../utils/stats');
    const officials = await User.find({ role: 'official', approvalStatus: 'approved' }).select('-password');
    
    const officialsWithStats = await Promise.all(
      officials.map(async (official) => {
        const stats = await getOfficialStats(official._id);
        return {
          ...official.toObject(),
          rating: stats.rating,
          matches: stats.totalMatches,
          reviewsCount: stats.reviewsCount,
        };
      })
    );

    res.json({
      message: 'Officials retrieved successfully',
      officials: officialsWithStats
    });
  } catch (error) {
    console.error('Get officials error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 