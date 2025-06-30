import React from 'react';

const BookingOversight = () => {
  const bookings = [
    { organizer: 'Sports League Inc.', event: 'Basketball Game', date: 'Dec 15, 2023 - 7:00 PM', official: 'John Doe', status: 'CONFIRMED' },
    { organizer: 'Community Sports Club', event: 'Soccer Match', date: 'Dec 18, 2023 - 3:00 PM', official: 'Unassigned', status: 'PENDING' },
    { organizer: 'Local Athletics Association', event: 'Track Meet', date: 'Dec 20, 2023 - 10:00 AM', official: 'Jane Smith', status: 'CANCELLED' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-white p-4 shadow-lg">
        <h3 className="text-lg font-bold mb-4">Admin Panel</h3>
        <nav className="space-y-2">
          <a href="#" className="block p-2 bg-gray-200 rounded">Dashboard</a>
          <a href="#" className="block p-2 bg-gray-200 rounded">Manage Officials</a>
          <a href="#" className="block p-2 bg-gray-200 rounded">Manage Organizers</a>
          <a href="#" className="block p-2 bg-gray-200 rounded">Booking Oversight</a>
          <a href="#" className="block p-2 bg-gray-200 rounded">Notifications</a>
          <a href="#" className="block p-2 bg-gray-200 rounded">Settings</a>
        </nav>
      </div>
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Booking Oversight</h2>
        <h3 className="text-lg font-medium mb-2">All Bookings</h3>
        <button className="bg-blue-500 text-white p-2 rounded mb-4">Export List</button>
        {bookings.map((booking, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center">
            <div>
              <p>{booking.organizer} - {booking.event}</p>
              <p>{booking.date}</p>
              <p>Official: {booking.official}</p>
            </div>
            <div className="space-x-2">
              <span className={`px-2 py-1 rounded ${booking.status === 'CONFIRMED' ? 'bg-green-200' : booking.status === 'PENDING' ? 'bg-gray-200' : 'bg-red-200'}`}>
                {booking.status}
              </span>
              <button className="bg-blue-500 text-white px-2 py-1 rounded">Assign Official</button>
              <button className="bg-red-500 text-white px-2 py-1 rounded">Flag Issue</button>
            </div>
          </div>
        ))}
        <h3 className="text-lg font-medium mb-2 mt-6">System Controls</h3>
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <p>Toggle availability system-wide</p>
          <input type="checkbox" className="ml-2" />
        </div>
        <button className="bg-blue-200 text-blue-800 p-2 rounded w-full">Export all bookings/users to CSV</button>
      </div>
    </div>
  );
};

export default BookingOversight;