import React from "react";
import OrganizerNavbar from "./OrganizerNavbar";

export default function OrgDashboard() {
  const bookings = [
    { id: 1, match: "Football - Local League", date: "2025-07-05", status: "Confirmed", venue: "City Stadium", officials: 3 },
    { id: 2, match: "Cricket - College Cup", date: "2025-07-10", status: "Pending", venue: "Sports Complex", officials: 2 },
    { id: 3, match: "Basketball - City Championship", date: "2025-07-12", status: "Confirmed", venue: "Metro Arena", officials: 2 },
    { id: 4, match: "Tennis - Summer Tournament", date: "2025-07-18", status: "Cancelled", venue: "Tennis Club", officials: 1 },
  ];

  const stats = [
    { label: "Total Bookings", value: "24", icon: "📅", color: "bg-blue-500" },
    { label: "This Month", value: "8", icon: "📊", color: "bg-green-500" },
    { label: "Confirmed", value: "18", icon: "✅", color: "bg-emerald-500" },
    { label: "Pending", value: "4", icon: "⏳", color: "bg-yellow-500" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Confirmed":
        return "✅";
      case "Pending":
        return "⏳";
      case "Cancelled":
        return "❌";
      default:
        return "❓";
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <OrganizerNavbar />
      
      <main className="flex-1 ml-64 p-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold text-[#0B405B] mb-2">
                Welcome back! 👋
              </h1>
              <p className="text-gray-600 text-lg">
                Here's what's happening with your bookings today
              </p>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-[#94D82A] to-[#7BC226] text-[#0B405B] rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-lg shadow-md">
              ➕ New Booking
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-white text-xl shadow-sm`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bookings Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 bg-gradient-to-r from-[#0B405B] to-[#0a364d] text-white">
            <h2 className="text-2xl font-bold mb-2">📋 Recent Bookings</h2>
            <p className="text-blue-100">Manage your upcoming events and appointments</p>
          </div>

          <div className="p-8">
            {bookings.length > 0 ? (
              <div className="grid gap-6 lg:grid-cols-2">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="group border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50 hover:from-blue-50 hover:to-white"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#0B405B] transition-colors mb-2">
                          🏆 {booking.match}
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-600">
                            <span className="mr-2">📅</span>
                            <span className="font-medium">
                              {new Date(booking.date).toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <span className="mr-2">📍</span>
                            <span>{booking.venue}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <span className="mr-2">👥</span>
                            <span>{booking.officials} Officials Assigned</span>
                          </div>
                        </div>
                      </div>
                      <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(booking.status)}`}>
                        <span className="mr-2">{getStatusIcon(booking.status)}</span>
                        {booking.status}
                      </div>
                    </div>
                    
                    <div className="flex space-x-3 pt-4 border-t border-gray-100">
                      <button className="flex-1 bg-[#0B405B] text-white py-2 px-4 rounded-lg hover:bg-[#0a364d] transition-colors font-medium">
                        View Details
                      </button>
                      <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                        Edit Booking
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">📅</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No bookings yet</h3>
                <p className="text-gray-500 text-lg mb-8">Get started by creating your first booking and managing events efficiently.</p>
                <button className="px-8 py-4 bg-gradient-to-r from-[#94D82A] to-[#7BC226] text-[#0B405B] rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-lg">
                  ➕ Create Your First Booking
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 cursor-pointer group">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Search Officials</h3>
              <p className="text-gray-500">Find and book qualified officials for your events</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 cursor-pointer group">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">View Reports</h3>
              <p className="text-gray-500">Analyze your booking patterns and performance</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 cursor-pointer group">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Settings</h3>
              <p className="text-gray-500">Manage your account and preferences</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}