import React from 'react';

const Dashboard = () => {
  const profile = { name: 'John Doe', sports: ['Cricket', 'Football'], experience: '5 years', email: 'john.doe@example.com', location: 'London, UK' };
  const requests = [{ organizer: 'City Sports League', date: '2024-07-20' }];

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
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h3 className="text-lg font-medium mb-2">Your Profile</h3>
          <p>Name: {profile.name}</p>
          <p>Sports: {profile.sports.join(', ')}</p>
          <p>Experience: {profile.experience}</p>
          <p>Email: {profile.email}</p>
          <p>Location: {profile.location}</p>
          <button className="bg-blue-600 text-white p-2 rounded mt-2">Edit Profile</button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h3 className="text-lg font-medium mb-2">Manage Availability</h3>
          <div className="mt-1 p-2 border border-gray-300 rounded-md h-32 flex items-center justify-center text-gray-500">
            Calendar UI Placeholder
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Incoming Booking Requests</h3>
          {requests.map((request, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center">
              <div>
                <p>Organizer: {request.organizer}</p>
                <p>Date: {request.date}</p>
              </div>
              <div className="space-x-2">
                <button className="bg-green-500 text-white px-2 py-1 rounded">Accept</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded">Reject</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;