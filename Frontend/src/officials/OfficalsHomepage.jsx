import React, { useState, useCallback, useEffect } from "react";
import {
  User,
  Calendar as CalendarIcon,
  Bell,
  Settings,
  Star,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Menu,
  X,
  BookOpen,
  Award,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import api from "../services/api";

// Mock API service
const mockApiService = {
  getToken: () => "mock-token",
  logout: () => {},
  getCurrentUser: () =>
    Promise.resolve({
      user: {
        _id: "1",
        name: "John Smith",
        email: "john@example.com",
        phone: "+1234567890",
        location: "Mumbai, Maharashtra",
        dateOfBirth: "1985-06-15",
        experience: "5 years",
        sports: ["Football", "Basketball"],
        certifications: ["FIFA Certified", "Basketball Official Level 2"],
        organization: "Sports Officials Association",
        rating: 4.8,
        totalMatches: 125,
        upcomingBookings: 3,
        pendingRequests: 2,
        approvalStatus: "approved",
      },
    }),
  updateProfile: (data) =>
    Promise.resolve({
      user: {
        _id: "1",
        name: data.name,
        email: "john@example.com",
        phone: data.phone,
        location: data.location,
        dateOfBirth: data.dateOfBirth,
        experience: data.experience,
        sports: ["Football", "Basketball"],
        certifications: ["FIFA Certified", "Basketball Official Level 2"],
        organization: data.organization,
        rating: 4.8,
        totalMatches: 125,
        upcomingBookings: 3,
        pendingRequests: 2,
        approvalStatus: "approved",
      },
    }),
  get: (url) =>
    Promise.resolve({
      data: [
        {
          _id: "1",
          start: new Date().toISOString(),
          end: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        },
      ],
    }),
  post: (url, data) =>
    Promise.resolve({
      data: {
        _id: Date.now().toString(),
        start: data.start,
        end: data.end,
      },
    }),
};

// Mock data
const recentBookings = [
  {
    id: 1,
    tournament: "Premier League Match",
    venue: "Wembley Stadium",
    date: "July 28, 2025",
    time: "3:00 PM",
    sport: "Football",
    status: "confirmed",
  },
  {
    id: 2,
    tournament: "Basketball Championship",
    venue: "Sports Complex",
    date: "July 30, 2025",
    time: "7:00 PM",
    sport: "Basketball",
    status: "pending",
  },
];

const pendingRequests = [
  {
    id: 1,
    tournament: "Youth Football Cup",
    organizer: "Mumbai FC",
    date: "August 5, 2025",
    time: "4:00 PM",
    fee: "₹2,500",
  },
  {
    id: 2,
    tournament: "Inter-School Basketball",
    organizer: "Delhi Sports Club",
    date: "August 8, 2025",
    time: "6:00 PM",
    fee: "₹1,800",
  },
];

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: BookOpen },
  { id: "profile", label: "Profile", icon: User },
  { id: "availability", label: "Availability", icon: CalendarIcon },
  { id: "bookings", label: "My Bookings", icon: CheckCircle },
  { id: "requests", label: "Booking Requests", icon: Bell },
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "earnings", label: "Earnings", icon: DollarSign },
  { id: "settings", label: "Settings", icon: Settings },
];

const OfficialDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [availabilities, setAvailabilities] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    start: null,
    end: null,
    title: "Available",
    status: "available",
  });
  const [officialData, setOfficialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");

  // Booking Requests State
  const [bookingRequests, setBookingRequests] = useState([]);
  const [bookingLoading, setBookingLoading] = useState(true);
  const [bookingError, setBookingError] = useState("");
  const [actionLoading, setActionLoading] = useState("");

  const handleLogout = () => {
    try {
      // Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userData");

      // Redirect to home page
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getApprovalStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 border-green-400 text-green-700";
      case "pending":
        return "bg-yellow-100 border-yellow-400 text-yellow-700";
      case "rejected":
        return "bg-red-100 border-red-400 text-red-700";
      default:
        return "bg-gray-100 border-gray-400 text-gray-700";
    }
  };

  const formatDateTime = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleBookingAction = async (id, action) => {
    setActionLoading(id);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update the booking status
      setBookingRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, status: action } : req))
      );

      alert(`Booking ${action} successfully`);
    } catch (error) {
      alert(`Failed to ${action} booking`);
    } finally {
      setActionLoading("");
    }
  };

  // Helper to get today's date in yyyy-MM-ddTHH:mm format
  const getTodayDateTimeLocal = () => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const hh = String(now.getHours()).padStart(2, "0");
    const min = String(now.getMinutes()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  };

  // Helper to get the current/future availability (if any)
  const getActiveAvailability = () => {
    const now = new Date();
    return availabilities.find((a) => a.end >= now);
  };

  useEffect(() => {
    const handlePopState = () => {
      mockApiService.logout();
      alert("Session ended");
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    const fetchOfficialData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.getCurrentUser();
        setOfficialData(response.user);
      } catch (err) {
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };
    fetchOfficialData();
  }, []);

  useEffect(() => {
    const fetchBookingRequests = async () => {
      setBookingLoading(true);
      setBookingError("");
      try {
        // Mock booking requests
        const mockBookings = [
          {
            _id: "1",
            event: {
              name: "Summer Championship",
              sport: "Football",
              date: "August 15, 2025",
              location: "Sports Stadium",
              details: "Final match of the tournament",
            },
            organizer: {
              name: "Sports Club Mumbai",
              email: "contact@sportsmumbai.com",
            },
            status: "pending",
            message:
              "We need an experienced referee for our championship final.",
          },
          {
            _id: "2",
            event: {
              name: "Youth Basketball League",
              sport: "Basketball",
              date: "August 20, 2025",
              location: "Community Center",
              details: "Semi-final match",
            },
            organizer: {
              name: "Youth Sports Association",
              email: "youth@sports.org",
            },
            status: "pending",
            message: "Looking for a certified basketball official.",
          },
        ];
        setBookingRequests(mockBookings);
      } catch (err) {
        setBookingError(err.message || "Error fetching booking requests");
      } finally {
        setBookingLoading(false);
      }
    };
    fetchBookingRequests();
  }, []);

  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [availabilityError, setAvailabilityError] = useState("");

  useEffect(() => {
    const fetchAvailabilities = async () => {
      if (!officialData?._id) return;
      setAvailabilityLoading(true);
      try {
        const response = await api.getAvailability(officialData._id);
        const formattedAvailabilities = response.map((availability) => ({
          id: availability._id,
          title: "Available",
          start: new Date(availability.startDate),
          end: new Date(availability.endDate),
          backgroundColor: "#94D82A",
          borderColor: "#0B405B",
        }));
        setAvailabilities(formattedAvailabilities);
      } catch (error) {
        setAvailabilityError("Failed to fetch availabilities");
      } finally {
        setAvailabilityLoading(false);
      }
    };
    fetchAvailabilities();
  }, [officialData?._id]);

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!newEvent.start || !newEvent.end) {
      alert("Please select both start and end times");
      return;
    }
    try {
      const response = await api.addAvailability({
        startDate: newEvent.start,
        endDate: newEvent.end,
        officialId: officialData._id,
      });
      const formattedEvent = {
        id: response._id,
        title: "Available",
        start: new Date(response.startDate),
        end: new Date(response.endDate),
        backgroundColor: "#94D82A",
        borderColor: "#0B405B",
      };
      setAvailabilities([formattedEvent]); // Only one active availability
      setShowAddModal(false);
      setNewEvent({
        start: null,
        end: null,
        title: "Available",
        status: "available",
      });
    } catch (error) {
      alert("Failed to add availability");
    }
  };

  const handleSelectSlot = useCallback(
    (slotInfo) => {
      setNewEvent({
        ...newEvent,
        start: slotInfo.start,
        end: slotInfo.end,
      });
      setShowAddModal(true);
    },
    [newEvent]
  );

  const handleSelectEvent = useCallback((event) => {
    console.log("Selected event:", event);
  }, []);

  const handleEditProfile = () => {
    setEditForm({
      name: officialData?.name || "",
      phone: officialData?.phone || "",
      location: officialData?.location || "",
      dateOfBirth: officialData?.dateOfBirth || "",
      experience: officialData?.experience || "",
      sports: officialData?.sports || [],
      certifications: officialData?.certifications || [],
      organization: officialData?.organization || "",
    });
    setShowEditModal(true);
    setEditError("");
  };

  const handleEditInputChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditProfileSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError("");
    try {
      const response = await mockApiService.updateProfile(editForm);
      setOfficialData(response.user);
      setShowEditModal(false);
    } catch (err) {
      setEditError(err.message || "Failed to update profile");
    } finally {
      setEditLoading(false);
    }
  };

  const renderDashboardContent = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {officialData?.name || "Official"}!
            </h1>
            <p className="text-gray-600 mt-1">
              Here's what's happening with your officiating schedule
            </p>
          </div>
          <div className="flex items-center space-x-2 text-yellow-500">
            <Star className="w-5 h-5 fill-current" />
            <span className="font-semibold">
              {officialData?.rating || "N/A"}
            </span>
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
                {officialData?.totalMatches || "N/A"}
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
              <CalendarIcon className="w-6 h-6" style={{ color: "#0B405B" }} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900">
                {officialData?.upcomingBookings || "N/A"}
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
                {officialData?.pendingRequests || "N/A"}
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
                {officialData?.rating || "N/A"}/5
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
                      <CalendarIcon className="w-4 h-4 mr-1" />
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
                        <CalendarIcon className="w-4 h-4 mr-1" />
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
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div
                className="h-32"
                style={{
                  background: `linear-gradient(135deg, #0B405B 0%, #94D82A 100%)`,
                }}
              ></div>
              <div className="relative px-6 pb-6 bg-white">
                <div className="flex items-end space-x-5 -mt-12">
                  <div
                    className="w-24 h-24 rounded-full border-4 border-white flex items-center justify-center text-2xl font-bold shadow-lg"
                    style={{ backgroundColor: "#94D82A", color: "#0B405B" }}
                  >
                    {officialData?.name
                      ? officialData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                      : "O"}
                  </div>
                  <div className="pb-2">
                    <h1 className="text-2xl font-bold text-gray-900">
                      {officialData?.name || "Official"}
                    </h1>
                    <p className="text-gray-600">
                      {officialData?.sports?.join(" • ") || "No sports listed"}
                    </p>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="ml-1 text-sm font-medium text-gray-700">
                        {officialData?.rating || "N/A"}/5
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        ({officialData?.totalMatches || "N/A"} matches)
                      </span>
                    </div>
                  </div>
                  <div className="ml-auto pb-2">
                    <button
                      className="px-4 py-2 text-sm font-medium text-white rounded-md hover:opacity-90"
                      style={{ backgroundColor: "#0B405B" }}
                      onClick={handleEditProfile}
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Profile Modal */}
            {showEditModal && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-screen overflow-y-auto">
                  <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                  <form
                    onSubmit={handleEditProfileSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={editForm?.name || ""}
                        onChange={(e) =>
                          handleEditInputChange("name", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="text"
                        value={editForm?.phone || ""}
                        onChange={(e) =>
                          handleEditInputChange("phone", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={editForm?.location || ""}
                        onChange={(e) =>
                          handleEditInputChange("location", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={editForm?.dateOfBirth || ""}
                        onChange={(e) =>
                          handleEditInputChange("dateOfBirth", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Experience
                      </label>
                      <input
                        type="text"
                        value={editForm?.experience || ""}
                        onChange={(e) =>
                          handleEditInputChange("experience", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                    {editError && (
                      <div className="text-red-600 text-sm">{editError}</div>
                    )}
                    <div className="flex justify-end space-x-3 mt-4">
                      <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50"
                        onClick={() => setShowEditModal(false)}
                        disabled={editLoading}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white rounded-md"
                        style={{ backgroundColor: "#0B405B" }}
                        disabled={editLoading}
                      >
                        {editLoading ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Personal Information */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Personal Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <p className="text-gray-900">
                        {officialData?.name || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <p className="text-gray-900">
                        {officialData?.email || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <p className="text-gray-900">
                        {officialData?.phone || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth
                      </label>
                      <p className="text-gray-900">
                        {officialData?.dateOfBirth || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <p className="text-gray-900">
                        {officialData?.location || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Experience
                      </label>
                      <p className="text-gray-900">
                        {officialData?.experience || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sports & Specializations */}
                <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Sports & Specializations
                  </h2>
                  <div className="space-y-4">
                    {officialData?.sports?.map((sport, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-900">{sport}</h3>
                          <span
                            className="px-2 py-1 text-xs font-medium rounded-full"
                            style={{
                              backgroundColor: "#94D82A33",
                              color: "#0B405B",
                            }}
                          >
                            Primary
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Roles:</span>
                            <p className="text-gray-900">
                              {sport === "Football"
                                ? "Referee, Linesman"
                                : "Referee, Scorer"}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-600">Level:</span>
                            <p className="text-gray-900">
                              {sport === "Football"
                                ? "Professional"
                                : "Semi-Professional"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Statistics */}
                <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Performance Statistics
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">
                        {officialData?.totalMatches || "N/A"}
                      </div>
                      <div className="text-sm text-gray-600">Total Matches</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">
                        {officialData?.rating || "N/A"}
                      </div>
                      <div className="text-sm text-gray-600">
                        Average Rating
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">
                        98%
                      </div>
                      <div className="text-sm text-gray-600">
                        Completion Rate
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">15</div>
                      <div className="text-sm text-gray-600">This Month</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Certifications
                  </h2>
                  <div className="space-y-3">
                    {officialData?.certifications?.map((cert, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg"
                      >
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "#94D82A33" }}
                        >
                          <Award
                            className="w-5 h-5"
                            style={{ color: "#0B405B" }}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{cert}</p>
                          <p className="text-xs text-gray-500">
                            Valid until 2026
                          </p>
                        </div>
                      </div>
                    ))}
                    <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700">
                      + Add Certification
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Availability Status
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Current Status</span>
                      <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                        Available
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Next Available</span>
                      <span className="text-sm text-gray-900">
                        July 28, 2025
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">
                        Weekend Availability
                      </span>
                      <span className="text-sm text-gray-900">Open</span>
                    </div>
                    <button className="w-full mt-3 px-4 py-2 text-sm font-medium border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                      Update Availability
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Recent Reviews
                  </h2>
                  <div className="space-y-4">
                    <div className="border-b border-gray-200 pb-3">
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">5.0</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        "Excellent officiating skills and professional conduct."
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        - Mumbai FC Tournament
                      </p>
                    </div>
                    <div className="border-b border-gray-200 pb-3">
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                          <Star className="w-4 h-4 text-gray-300" />
                        </div>
                        <span className="ml-2 text-sm text-gray-600">4.0</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        "Good decision making throughout the match."
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        - Basketball League
                      </p>
                    </div>
                    <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium">
                      View All Reviews
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "availability":
        const activeAvailability = getActiveAvailability();
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Availability Calendar
              </h2>
              <button
                onClick={() => {
                  if (activeAvailability) {
                    setNewEvent({
                      start: activeAvailability.start,
                      end: activeAvailability.end,
                      title: "Available",
                      status: "available",
                    });
                  } else {
                    setNewEvent({
                      start: null,
                      end: null,
                      title: "Available",
                      status: "available",
                    });
                  }
                  setShowAddModal(true);
                }}
                className="px-4 py-2 text-sm font-medium text-white rounded-md"
                style={{ backgroundColor: "#0B405B" }}
              >
                {activeAvailability
                  ? "Update Availability"
                  : "Add Availability"}
              </button>
            </div>
            <Calendar
              localizer={momentLocalizer(moment)}
              events={availabilities}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              views={["month", "week", "day"]}
              defaultView="month"
              selectable
              onSelectSlot={(slotInfo) => {
                const now = new Date();
                now.setHours(0, 0, 0, 0);
                if (slotInfo.start < now) {
                  alert("Cannot select past dates");
                  return;
                }
                setNewEvent({
                  start: slotInfo.start,
                  end: slotInfo.end,
                  title: "Available",
                  status: "available",
                });
                setShowAddModal(true);
              }}
              onSelectEvent={handleSelectEvent}
            />
            {/* Add/Update Availability Modal */}
            {showAddModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <h3 className="text-lg font-semibold mb-4">
                    {activeAvailability
                      ? "Update Availability"
                      : "Add Availability"}
                  </h3>
                  <form onSubmit={handleAddEvent}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Start Date & Time
                        </label>
                        <input
                          type="datetime-local"
                          value={
                            newEvent.start ? formatDateTime(newEvent.start) : ""
                          }
                          onChange={(e) =>
                            setNewEvent({
                              ...newEvent,
                              start: new Date(e.target.value),
                            })
                          }
                          className="w-full border border-gray-300 rounded-md p-2"
                          required
                          min={getTodayDateTimeLocal()}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          End Date & Time
                        </label>
                        <input
                          type="datetime-local"
                          value={
                            newEvent.end ? formatDateTime(newEvent.end) : ""
                          }
                          onChange={(e) =>
                            setNewEvent({
                              ...newEvent,
                              end: new Date(e.target.value),
                            })
                          }
                          className="w-full border border-gray-300 rounded-md p-2"
                          required
                          min={getTodayDateTimeLocal()}
                        />
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowAddModal(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white rounded-md"
                        style={{ backgroundColor: "#0B405B" }}
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
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
            {bookingLoading ? (
              <div className="text-center py-8">
                <span className="text-4xl">⚙️</span>
                <p className="text-gray-600 mt-2">
                  Loading booking requests...
                </p>
              </div>
            ) : bookingError ? (
              <div className="text-center py-8">
                <span className="text-4xl">❌</span>
                <p className="text-red-600 mt-2">{bookingError}</p>
              </div>
            ) : bookingRequests.length === 0 ? (
              <div className="text-center py-8">
                <span className="text-4xl">📭</span>
                <p className="text-gray-600 mt-2">
                  No booking requests at the moment.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookingRequests.map((req) => (
                  <div
                    key={req._id}
                    className="bg-white rounded-xl shadow p-6 border border-gray-100"
                  >
                    <div className="mb-2 flex justify-between items-center">
                      <div>
                        <span className="font-bold text-lg text-[#0B405B]">
                          {req.event.name}
                        </span>
                        <span className="ml-2 text-sm text-gray-500">
                          ({req.event.sport})
                        </span>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          req.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : req.status === "accepted"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {req.status.charAt(0).toUpperCase() +
                          req.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-gray-700 mb-2">
                      <div>
                        <b>Date:</b> {req.event.date}
                      </div>
                      <div>
                        <b>Location:</b> {req.event.location}
                      </div>
                      {req.event.details && (
                        <div>
                          <b>Details:</b> {req.event.details}
                        </div>
                      )}
                    </div>
                    <div className="text-gray-600 mb-2">
                      <b>Organizer:</b> {req.organizer?.name} (
                      {req.organizer?.email})
                    </div>
                    {req.message && (
                      <div className="mb-2 text-gray-500 italic">
                        "{req.message}"
                      </div>
                    )}
                    {req.status === "pending" && (
                      <div className="flex space-x-4 mt-4">
                        <button
                          className="flex-1 bg-green-500 text-white py-2 rounded-lg font-bold hover:bg-green-600 transition-colors"
                          onClick={() =>
                            handleBookingAction(req._id, "accepted")
                          }
                          disabled={actionLoading === req._id}
                        >
                          {actionLoading === req._id
                            ? "Accepting..."
                            : "Accept"}
                        </button>
                        <button
                          className="flex-1 bg-red-500 text-white py-2 rounded-lg font-bold hover:bg-red-600 transition-colors"
                          onClick={() =>
                            handleBookingAction(req._id, "rejected")
                          }
                          disabled={actionLoading === req._id}
                        >
                          {actionLoading === req._id
                            ? "Rejecting..."
                            : "Reject"}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">Loading profile...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600 font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          ></div>
        </div>
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="flex flex-col h-full min-h-screen"
          style={{ backgroundColor: "#0B405B" }}
        >
          <div className="flex items-center justify-between h-16 px-6 border-b border-blue-800 flex-shrink-0">
            <h1 className="text-xl font-bold text-white">MatchOfficials</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md text-white hover:bg-blue-800"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="px-6 py-4 border-b border-blue-800 flex-shrink-0">
            <div className="flex items-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                style={{ backgroundColor: "#94D82A" }}
              >
                {officialData?.name
                  ? officialData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                  : "O"}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">
                  {officialData?.name || "Official"}
                </p>
                <p className="text-xs text-blue-200">
                  {officialData?.sports?.join(", ") || "No sports listed"}
                </p>
              </div>
            </div>
          </div>

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
                    officialData?.pendingRequests > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                        {officialData?.pendingRequests || "0"}
                      </span>
                    )}
                </button>
              );
            })}
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 text-blue-200 hover:text-white hover:bg-blue-800"
            >
              <X className="w-5 h-5 mr-3" />
              Logout
            </button>
          </nav>

          <div className="px-6 py-4 border-t border-blue-800 flex-shrink-0 mt-auto">
            <div className="flex items-center justify-between text-sm text-blue-200">
              <span>Experience</span>
              <span className="text-white font-medium">
                {officialData?.experience || "N/A"}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-blue-200 mt-2">
              <span>Location</span>
              <span className="text-white font-medium text-xs">
                {officialData?.location?.split(",")[0] || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-screen">
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
                {officialData?.pendingRequests > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {officialData?.pendingRequests || "0"}
                  </span>
                )}
              </div>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold"
                style={{ backgroundColor: "#0B405B" }}
              >
                {officialData?.name
                  ? officialData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                  : "O"}
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 p-6 overflow-y-auto">
          {/* Approval Status Section */}
          {officialData && (
            <div
              className={`mb-6 p-4 rounded shadow ${getApprovalStatusColor(
                officialData.approvalStatus
              )}`}
            >
              <span className="font-semibold">Status: </span>
              <span className="uppercase font-bold">
                {officialData.approvalStatus}
              </span>
              {officialData.approvalStatus === "pending" && (
                <div className="mt-2 text-yellow-700">
                  Your account is pending approval. You will gain access to all
                  functionalities once approved by the admin.
                </div>
              )}
              {officialData.approvalStatus === "rejected" && (
                <div className="mt-2 text-red-700">
                  Your account has been rejected. Please contact support for
                  more information.
                </div>
              )}
            </div>
          )}
          {/* Lock functionalities if not approved */}
          {officialData && officialData.approvalStatus !== "approved" ? (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
              <div className="text-lg font-semibold mb-2">
                Access Restricted
              </div>
              <div className="mb-4">
                Your account is not approved yet. Only your profile is
                accessible.
              </div>
            </div>
          ) : (
            renderContent()
          )}
        </main>
      </div>
    </div>
  );
};

export default OfficialDashboard;
