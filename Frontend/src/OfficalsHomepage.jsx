import React, { useState } from "react";
import {
  User,
  Calendar,
  Bell,
  Settings,
  Star,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Menu,
  X,
  BookOpen,
  Award,
  TrendingUp,
  DollarSign,
} from "lucide-react";

const OfficialDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data - in real app this would come from API
  const officialData = {
    name: "John Smith",
    sports: ["Football", "Basketball"],
    rating: 4.8,
    location: "Mumbai, Maharashtra",
    experience: "5 years",
    certifications: ["FIFA Level 2", "NBA Licensed"],
    totalMatches: 127,
    upcomingBookings: 3,
    pendingRequests: 2,
  };

  const recentBookings = [
    {
      id: 1,
      tournament: "Mumbai Premier League",
      sport: "Football",
      date: "2025-07-15",
      time: "16:00",
      status: "confirmed",
      venue: "Cooperage Ground",
    },
    {
      id: 2,
      tournament: "State Basketball Championship",
      sport: "Basketball",
      date: "2025-07-20",
      time: "14:30",
      status: "confirmed",
      venue: "NSCI Stadium",
    },
    {
      id: 3,
      tournament: "Inter-College Football",
      sport: "Football",
      date: "2025-07-25",
      time: "10:00",
      status: "confirmed",
      venue: "Oval Maidan",
    },
  ];

  const pendingRequests = [
    {
      id: 1,
      tournament: "Corporate League Finals",
      sport: "Football",
      date: "2025-08-05",
      time: "18:00",
      organizer: "SportsCorp Events",
      fee: "₹5,000",
    },
    {
      id: 2,
      tournament: "Youth Basketball Cup",
      sport: "Basketball",
      date: "2025-08-10",
      time: "15:30",
      organizer: "Maharashtra Sports Council",
      fee: "₹3,500",
    },
  ];

  const sidebarItems = [
    { id: "dashboard", icon: TrendingUp, label: "Dashboard" },
    { id: "profile", icon: User, label: "My Profile" },
    { id: "availability", icon: Calendar, label: "Availability" },
    { id: "bookings", icon: BookOpen, label: "My Bookings" },
    { id: "requests", icon: Bell, label: "Booking Requests" },
    { id: "certifications", icon: Award, label: "Certifications" },
    { id: "earnings", icon: DollarSign, label: "Earnings" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  const handleBookingAction = (requestId, action) => {
    // In real app, this would make API call
    console.log(`${action} booking request ${requestId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "rejected":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const renderDashboardContent = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {officialData.name}!
            </h1>
            <p className="text-gray-600 mt-1">
              Here's what's happening with your officiating schedule
            </p>
          </div>
          <div className="flex items-center space-x-2 text-yellow-500">
            <Star className="w-5 h-5 fill-current" />
            <span className="font-semibold">{officialData.rating}</span>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Matches</p>
              <p className="text-2xl font-bold text-gray-900">
                {officialData.totalMatches}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div
              className="p-3 rounded-full"
              style={{ backgroundColor: "#94D82A33" }}
            >
              <Calendar className="w-6 h-6" style={{ color: "#0B405B" }} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900">
                {officialData.upcomingBookings}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <Bell className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Pending Requests
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {officialData.pendingRequests}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <Star className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rating</p>
              <p className="text-2xl font-bold text-gray-900">
                {officialData.rating}/5
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Bookings
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    {booking.tournament}
                  </h3>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {booking.venue}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {booking.date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {booking.time}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="px-2 py-1 text-xs font-medium rounded-full border border-gray-300">
                    {booking.sport}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Requests */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Pending Booking Requests
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <div
                key={request.id}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {request.tournament}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Organized by {request.organizer}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {request.date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {request.time}
                      </span>
                      <span className="font-medium text-green-600">
                        {request.fee}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleBookingAction(request.id, "accept")}
                      className="flex items-center px-3 py-1 text-sm font-medium text-white rounded-md"
                      style={{ backgroundColor: "#0B405B" }}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Accept
                    </button>
                    <button
                      onClick={() => handleBookingAction(request.id, "reject")}
                      className="flex items-center px-3 py-1 text-sm font-medium text-red-600 border border-red-300 rounded-md hover:bg-red-50"
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboardContent();
      case "profile":
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">My Profile</h2>
            <p className="text-gray-600">
              Profile management interface will be implemented here.
            </p>
          </div>
        );
      case "availability":
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Availability Calendar
            </h2>
            <p className="text-gray-600">
              Calendar interface for managing availability will be implemented
              here.
            </p>
          </div>
        );
      case "bookings":
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              My Bookings
            </h2>
            <p className="text-gray-600">
              Complete bookings history and management will be implemented here.
            </p>
          </div>
        );
      case "requests":
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Booking Requests
            </h2>
            <p className="text-gray-600">
              Detailed booking requests management will be implemented here.
            </p>
          </div>
        );
      case "certifications":
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Certifications
            </h2>
            <p className="text-gray-600">
              Certification management and upload interface will be implemented
              here.
            </p>
          </div>
        );
      case "earnings":
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Earnings</h2>
            <p className="text-gray-600">
              Earnings tracking and payment history will be implemented here.
            </p>
          </div>
        );
      case "settings":
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Settings</h2>
            <p className="text-gray-600">
              Account settings and preferences will be implemented here.
            </p>
          </div>
        );
      default:
        return renderDashboardContent();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          ></div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="flex flex-col h-screen"
          style={{ backgroundColor: "#0B405B" }}
        >
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-blue-800">
            <h1 className="text-xl font-bold text-white">MatchOfficials</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md text-white hover:bg-blue-800"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Profile Summary */}
          <div className="px-6 py-4 border-b border-blue-800">
            <div className="flex items-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                style={{ backgroundColor: "#94D82A" }}
              >
                {officialData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">
                  {officialData.name}
                </p>
                <p className="text-xs text-blue-200">
                  {officialData.sports.join(", ")}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    activeTab === item.id
                      ? "text-white"
                      : "text-blue-200 hover:text-white hover:bg-blue-800"
                  }`}
                  style={
                    activeTab === item.id ? { backgroundColor: "#94D82A" } : {}
                  }
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                  {item.id === "requests" &&
                    officialData.pendingRequests > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                        {officialData.pendingRequests}
                      </span>
                    )}
                </button>
              );
            })}
          </nav>

          {/* Quick Stats */}
          <div className="px-6 py-4 border-t border-blue-800">
            <div className="flex items-center justify-between text-sm text-blue-200">
              <span>Experience</span>
              <span className="text-white font-medium">
                {officialData.experience}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-blue-200 mt-2">
              <span>Location</span>
              <span className="text-white font-medium text-xs">
                {officialData.location.split(",")[0]}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600" />
                {officialData.pendingRequests > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {officialData.pendingRequests}
                  </span>
                )}
              </div>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold"
                style={{ backgroundColor: "#0B405B" }}
              >
                {officialData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  );
};

export default OfficialDashboard;