const mongoose = require('mongoose');

const bookingRequestSchema = new mongoose.Schema({
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  official: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: {
    name: { type: String, required: true },
    date: { type: String, required: true },
    location: { type: String, required: true },
    sport: { type: String, required: true },
    details: { type: String },
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  message: { type: String }, // Optional message from organizer
}, { timestamps: true });

module.exports = mongoose.model('BookingRequest', bookingRequestSchema); 