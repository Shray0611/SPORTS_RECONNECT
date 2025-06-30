import React, { useState } from 'react';

const OfficialDetails = () => {
  const [matchDate, setMatchDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ matchDate, message });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-white p-4 shadow-lg">
        <h3 className="text-lg font-bold mb-4">Officials Hub</h3>
        <nav className="space-y-2">
          <a href="#" className="block p-2 bg-gray-200 rounded">Dashboard</a>
          <a href="#" className="block p-2 bg-gray-200 rounded">Search & Discover</a>
          <a href="#" className="block p-2 bg-gray-200 rounded">Profile</a>
          <a href="#" className="block p-2 bg-gray-200 rounded">Availability</a>
          <a href="#" className="block p-2 bg-gray-200 rounded">Booking Requests</a>
          <a href="#" className="block p-2 bg-gray-200 rounded">History</a>
          <a href="#" className="block p-2 bg-gray-200 rounded">Notifications</a>
          <a href="#" className="block p-2 bg-gray-200 rounded">Settings</a>
        </nav>
      </div>
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Official Details</h2>
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h3 className="text-lg font-medium mb-2">John Doe</h3>
          <p>Football</p>
          <p>Referee</p>
          <p>London, UK</p>
          <p>8 years experience</p>
          <p>4.8 Rating (120 reviews)</p>
          <p>Experienced football referee with a strong track record in local and regional leagues. Committed to fair play and ensuring a smooth game for all participants. Specializes in youth and amateur matches.</p>
          <button className="bg-blue-600 text-white p-2 rounded mt-2 w-full">Send Booking Request</button>
        </div>
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Request Booking</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">Match Date & Time</label>
            <div className="mt-1 p-2 border border-gray-300 rounded-md h-32 flex items-center justify-center text-gray-500">
              Select a date and time
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Your Message (Optional)</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="e.g., Details about the match, specific requirements, etc."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 mt-4"
          >
            Send Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default OfficialDetails;