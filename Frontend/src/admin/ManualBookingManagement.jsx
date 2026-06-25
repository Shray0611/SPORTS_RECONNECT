import React from "react";

const ManualBookingManagement = () => (
  <div className="space-y-8">
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-[#0B405B] mb-2">
        Manual Booking Management 📅
      </h1>
      <p className="text-gray-600 text-lg">
        Override or manage match bookings directly from the admin interface.
      </p>
    </div>
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-8 py-6 bg-gradient-to-r from-[#0B405B] to-[#0a364d] text-white">
        <h2 className="text-2xl font-bold mb-2">Active Bookings</h2>
        <p className="text-blue-100">
          Monitor and manage platform-wide appointments
        </p>
      </div>
      <div className="p-8">
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🛠️</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Coming Soon
          </h3>
          <p className="text-gray-500 text-lg">
            This module is currently under construction.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default ManualBookingManagement; 