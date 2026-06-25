import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrganizerNavbar from "./OrganizerNavbar";
import apiService from "../services/api";
import ChatInterface from "../components/ChatInterface";

export default function OrgDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showChatInterface, setShowChatInterface] = useState(false);
  const navigate = useNavigate();
  
  const [editForm, setEditForm] = useState({ date: "", time: "", location: "", message: "" });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");

  useEffect(() => {
    const handlePopState = () => {
      apiService.logout();
      window.location.href = "/";
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiService.getSentBookings();
      setBookings(data.bookings || []);
    } catch (err) {
      setError(err.message || "Error fetching bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const currentMonth = new Date().getMonth();
  const bookingsThisMonth = bookings.filter(b => b.event?.date && new Date(b.event.date).getMonth() === currentMonth).length;
  const confirmedBookings = bookings.filter(b => b.status === "accepted" || b.status === "confirmed").length;
  const pendingBookingsCount = bookings.filter(b => b.status === "pending").length;

  const stats = [
    { label: "Total Bookings", value: bookings.length.toString(), icon: "📅", color: "bg-blue-500" },
    { label: "This Month", value: bookingsThisMonth.toString(), icon: "📊", color: "bg-green-500" },
    { label: "Confirmed", value: confirmedBookings.toString(), icon: "✅", color: "bg-emerald-500" },
    { label: "Pending", value: pendingBookingsCount.toString(), icon: "⏳", color: "bg-yellow-500" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
      case "confirmed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "rejected":
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "accepted":
      case "confirmed":
        return "✅";
      case "pending":
        return "⏳";
      case "rejected":
      case "cancelled":
        return "❌";
      default:
        return "❓";
    }
  };

  const handleEditClick = (booking) => {
    setSelectedBooking(booking);
    if (booking.event?.date) {
      const d = new Date(booking.event.date);
      const date = d.toISOString().split("T")[0];
      const time = d.toTimeString().split(" ")[0].slice(0, 5);
      setEditForm({
        date,
        time,
        location: booking.event.location || "",
        message: booking.message || ""
      });
    }
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError("");
    try {
      await apiService.updateBookingDetails(selectedBooking._id, {
        event: {
          date: `${editForm.date}T${editForm.time}`,
          location: editForm.location
        },
        message: editForm.message
      });
      setShowEditModal(false);
      fetchBookings();
    } catch (err) {
      setEditError(err.message || "Failed to update booking");
    } finally {
      setEditLoading(false);
    }
  };

  const displayedBookings = bookings.filter((b) => b.status === activeTab);

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
            <button 
              onClick={() => navigate("/organizer/search")}
              className="px-6 py-3 bg-gradient-to-r from-[#94D82A] to-[#7BC226] text-[#0B405B] rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-lg shadow-md"
            >
              ➕ New Booking
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-white text-xl shadow-sm`}
                  >
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
            <h2 className="text-2xl font-bold mb-2">📋 Bookings Management</h2>
            <p className="text-blue-100">
              Manage your upcoming events and appointments
            </p>
          </div>
          
          <div className="flex border-b border-gray-200">
            {["pending", "accepted", "rejected"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 text-center font-bold text-lg capitalize transition-colors ${
                  activeTab === tab
                    ? "text-[#0B405B] border-b-4 border-[#94D82A] bg-gray-50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-8">
            {loading ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">⚙️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Loading bookings...
                </h3>
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">❌</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Error: {error}
                </h3>
              </div>
            ) : displayedBookings.length > 0 ? (
              <div className="grid gap-6 lg:grid-cols-2">
                {displayedBookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="group border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50 hover:from-blue-50 hover:to-white"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#0B405B] transition-colors mb-2">
                          🏆 {booking.event?.name}{" "}
                          <span className="text-sm text-gray-500">
                            ({booking.event?.sport})
                          </span>
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-600">
                            <span className="mr-2">📅</span>
                            <span className="font-medium">
                              {booking.event?.date
                                ? new Date(
                                    booking.event.date
                                  ).toLocaleString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                  })
                                : "-"}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <span className="mr-2">📍</span>
                            <span>{booking.event?.location || "-"}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <span className="mr-2">👤</span>
                            <span>
                              Official: {booking.official?.name || "-"} (
                              {booking.official?.email || "-"})
                            </span>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(booking.status)}`}
                      >
                        <span className="mr-2">{getStatusIcon(booking.status)}</span>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </div>
                    </div>
                    <div className="flex space-x-3 pt-4 border-t border-gray-100">
                      <button 
                        onClick={() => {
                          setSelectedBooking(booking);
                          setShowViewModal(true);
                        }}
                        className="flex-1 bg-[#0B405B] text-white py-2 px-4 rounded-lg hover:bg-[#0a364d] transition-colors font-medium"
                      >
                        View Details
                      </button>
                      {booking.status === "pending" && (
                        <button 
                          onClick={() => handleEditClick(booking)}
                          className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                          Edit Booking
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">📅</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No {activeTab} bookings
                </h3>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Edit Booking Modal */}
      {showEditModal && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setShowEditModal(false)}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4 text-[#0B405B]">
              Edit Booking
            </h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">EVENT DATE</label>
                  <input
                    type="date"
                    value={editForm.date}
                    onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">EVENT TIME</label>
                  <input
                    type="time"
                    value={editForm.time}
                    onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">LOCATION</label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">MESSAGE</label>
                <textarea
                  value={editForm.message}
                  onChange={(e) => setEditForm({ ...editForm, message: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  rows="3"
                />
              </div>
              {editError && <div className="text-red-600">{editError}</div>}
              <button
                type="submit"
                className="w-full bg-[#0B405B] text-white py-3 rounded-lg font-bold hover:bg-[#09405B] transition-colors"
                disabled={editLoading}
              >
                {editLoading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showViewModal && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setShowViewModal(false)}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4 text-[#0B405B]">
              Booking Details
            </h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-600">Event Name</h4>
                <p className="text-gray-900 text-lg">{selectedBooking.event?.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-600">Date & Time</h4>
                  <p className="text-gray-900">
                    {selectedBooking.event?.date ? new Date(selectedBooking.event.date).toLocaleString() : "-"}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-600">Location</h4>
                  <p className="text-gray-900">{selectedBooking.event?.location || "-"}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-600">Sport</h4>
                  <p className="text-gray-900">{selectedBooking.event?.sport || "-"}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-600">Status</h4>
                  <p className="text-gray-900 capitalize">{selectedBooking.status}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-600">Official</h4>
                <p className="text-gray-900">{selectedBooking.official?.name} ({selectedBooking.official?.email})</p>
              </div>
              {selectedBooking.event?.details && (
                <div>
                  <h4 className="font-semibold text-gray-600">Event Details</h4>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedBooking.event.details}</p>
                </div>
              )}
              {selectedBooking.message && (
                <div>
                  <h4 className="font-semibold text-gray-600">Your Message</h4>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedBooking.message}</p>
                </div>
              )}
            </div>
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => {
                  setShowChatInterface(true);
                  setShowViewModal(false);
                }}
                className="flex-1 bg-[#0B405B] text-white py-3 rounded-lg font-bold hover:bg-[#09405B] transition-colors"
              >
                💬 Chat with Official
              </button>
              <button
                onClick={() => setShowViewModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showChatInterface && (
        <ChatInterface 
          onClose={() => setShowChatInterface(false)} 
          initialContact={selectedBooking?.official}
          currentUserRole="organizer" 
        />
      )}
    </div>
  );
}
