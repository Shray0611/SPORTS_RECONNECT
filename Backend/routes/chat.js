const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const User = require('../models/User');
const { authMiddleware } = require('../middleware/auth');

// GET /api/chat/unread - Get total unread messages count
router.get('/unread', authMiddleware, async (req, res) => {
  try {
    const unreadCount = await Message.countDocuments({
      receiver: req.user._id,
      isRead: false
    });
    res.json({ count: unreadCount });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/chat/:userId - Get chat history with a specific user
router.get('/:userId', authMiddleware, async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const otherUserId = req.params.userId;

    const messages = await Message.find({
      $or: [
        { sender: currentUserId, receiver: otherUserId },
        { sender: otherUserId, receiver: currentUserId }
      ]
    }).sort({ createdAt: 1 });

    // Mark messages as read where current user is receiver
    await Message.updateMany(
      { sender: otherUserId, receiver: currentUserId, isRead: false },
      { $set: { isRead: true, read: true } }
    );

    res.json({ messages });
  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/chat/send - Send a new message
router.post('/send', authMiddleware, async (req, res) => {
  try {
    const { receiverId, text } = req.body;
    const senderId = req.user._id;

    if (!receiverId || !text) {
      return res.status(400).json({ message: 'Receiver ID and text are required' });
    }

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    // Logic for Organizer message block:
    // Organizer can send message, once official replies it then only organizer can chat further
    if (req.user.role === 'organizer') {
      const BookingRequest = require('../models/BookingRequest');
      const hasAcceptedBooking = await BookingRequest.findOne({
        organizer: senderId,
        official: receiverId,
        status: 'accepted'
      });

      // Only restrict if there is NO accepted booking
      if (!hasAcceptedBooking) {
        // Find the last message sent between this pair
        const lastMessage = await Message.findOne({
          $or: [
            { sender: senderId, receiver: receiverId },
            { sender: receiverId, receiver: senderId }
          ]
        }).sort({ createdAt: -1 });

        // If the last message was sent by the organizer, they cannot send another one until official replies
        if (lastMessage && lastMessage.sender.toString() === senderId.toString()) {
          return res.status(403).json({ message: 'You must wait for the official to reply before sending another message.' });
        }
      }
    }

    const message = new Message({
      sender: senderId,
      receiver: receiverId,
      text
    });

    await message.save();

    res.status(201).json({ message: 'Message sent successfully', data: message });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
