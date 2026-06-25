import React from "react";

const Dashboard = () => (
  <div className="space-y-8">
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-[#0B405B] mb-2">
        Admin Overview 👑
      </h1>
      <p className="text-gray-600 text-lg">
        Welcome to the central command for GameOfficialsHub.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <h3 className="text-xl font-bold text-[#0B405B] mb-2">Registered Officials</h3>
        <p className="text-gray-500 mb-4">View and manage the directory of all verified officials.</p>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <h3 className="text-xl font-bold text-[#0B405B] mb-2">Profile Approvals</h3>
        <p className="text-gray-500 mb-4">Review pending registrations and verify new accounts.</p>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <h3 className="text-xl font-bold text-[#0B405B] mb-2">System Settings</h3>
        <p className="text-gray-500 mb-4">Configure platform-wide settings and preferences.</p>
      </div>
    </div>
  </div>
);

export default Dashboard; 