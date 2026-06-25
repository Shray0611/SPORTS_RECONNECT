const cron = require('node-cron');
const BookingRequest = require('../models/BookingRequest');
const nodemailer = require('nodemailer');
const User = require('../models/User');

const sendMail = async ({ to, subject, text }) => {
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
  });
};

const setupCronJobs = () => {
  // Run every day at 00:00 (Midnight)
  cron.schedule('0 0 * * *', async () => {
    console.log('Running daily booking reminder cron job...');
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const dayAfterTomorrow = new Date(tomorrow);
      dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

      // Find accepted bookings for today
      const todayBookings = await BookingRequest.find({
        status: 'accepted',
        'event.date': {
          $gte: today,
          $lt: tomorrow
        }
      }).populate('organizer official');

      // Find accepted bookings for tomorrow
      const tomorrowBookings = await BookingRequest.find({
        status: 'accepted',
        'event.date': {
          $gte: tomorrow,
          $lt: dayAfterTomorrow
        }
      }).populate('organizer official');

      // Send emails for today's bookings
      for (const booking of todayBookings) {
        if (booking.organizer && booking.official) {
          const subject = `Event Today: ${booking.event.name}`;
          const text = `Reminder: Your event "${booking.event.name}" is scheduled for today at ${new Date(booking.event.date).toLocaleTimeString()}. Location: ${booking.event.location}.`;
          await sendMail({ to: booking.organizer.email, subject, text });
          await sendMail({ to: booking.official.email, subject, text });
        }
      }

      // Send emails for tomorrow's bookings
      for (const booking of tomorrowBookings) {
        if (booking.organizer && booking.official) {
          const subject = `Upcoming Event Tomorrow: ${booking.event.name}`;
          const text = `Reminder: Your event "${booking.event.name}" is scheduled for tomorrow at ${new Date(booking.event.date).toLocaleTimeString()}. Location: ${booking.event.location}.`;
          await sendMail({ to: booking.organizer.email, subject, text });
          await sendMail({ to: booking.official.email, subject, text });
        }
      }

      console.log(`Sent reminders for ${todayBookings.length} events today, and ${tomorrowBookings.length} events tomorrow.`);
    } catch (error) {
      console.error('Error in cron job:', error);
    }
  });
};

module.exports = setupCronJobs;
