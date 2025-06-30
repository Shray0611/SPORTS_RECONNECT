import React from 'react';

const AdminPanel = () => {
  const officials = [
    { name: 'John Doe', role: 'Referee', sport: 'Football', location: 'New York', status: 'PENDING APPROVAL' },
    { name: 'Jane Smith', role: 'Umpire', sport: 'Basketball', location: 'Los Angeles', status: 'APPROVED' },
    { name: 'Mike Johnson', role: 'Scorer', sport: 'Basketball', location: 'Chicago', status: 'REJECTED' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-white p-4 shadow-lg">
        <h3 className="text-lg font-bold mb-4">Admin Panel</h3>
        <nav className="space-y-2">
          <a href="#" className="block p-2 bg-gray-200 rounded">Dashboard</a>
          <a href="#" className="block p-2 bg-gray-200 rounded">Manage Officials</a>
          <a href="#" className="block p-2 bg-gray-200 rounded">Manage Organizers</a>
          <a href="#" className="block p-2 bg-gray-200 rounded">Notifications</a>
          <a href="#" className="block p-2 bg-gray-200 rounded">Settings</a>
        </nav>
      </div>
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Moderate Officials</h2>
        <h3 className="text-lg font-medium mb-2">New Official Profiles</h3>
        <button className="bg-blue-500 text-white p-2 rounded mb-4">Export List</button>
        {officials.map((official, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center">
            <div>
              <p>{official.name}</p>
              <p>{official.role} | {official.sport} | {official.location}</p>
            </div>
            <div className="space-x-2">
              <span className={`px-2 py-1 rounded ${official.status === 'PENDING APPROVAL' ? 'bg-gray-200' : official.status === 'APPROVED' ? 'bg-green-200' : 'bg-red-200'}`}>
                {official.status}
              </span>
              {official.status === 'PENDING APPROVAL' && (
                <>
                  <button className="bg-green-500 text-white px-2 py-1 rounded">Approve</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">Reject</button>
                </>
              )}
              {official.status !== 'PENDING APPROVAL' && (
                <>
                  <button className="bg-blue-500 text-white px-2 py-1 rounded">View Details</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;