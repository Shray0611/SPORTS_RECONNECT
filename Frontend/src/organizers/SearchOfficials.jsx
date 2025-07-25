import React, { useState, useEffect } from "react";
import OrganizerNavbar from "./OrganizerNavbar";
import apiService from "../services/api";

export default function SearchOfficials() {
  const [filters, setFilters] = useState({
    sport: "",
    city: "",
  });
  const [selectedOfficial, setSelectedOfficial] = useState(null);
  const [officials, setOfficials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState("");
  const [bookingForm, setBookingForm] = useState({
    name: "",
    date: "",
    location: "",
    sport: "",
    details: "",
    message: "",
  });
  const [officialAvailability, setOfficialAvailability] = useState([]);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [availabilityError, setAvailabilityError] = useState("");

  useEffect(() => {
    const fetchOfficials = async () => {
      setLoading(true);
      setError("");
      try {
        const token = apiService.getToken();
        const response = await fetch("http://localhost:5000/api/officials", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch officials");
        }
        const data = await response.json();
        setOfficials(data.officials || []);
      } catch (err) {
        setError(err.message || "Error fetching officials");
      } finally {
        setLoading(false);
      }
    };
    fetchOfficials();
  }, []);

  useEffect(() => {
    if (!selectedOfficial?._id) {
      setOfficialAvailability([]);
      return;
    }
    setAvailabilityLoading(true);
    setAvailabilityError("");
    apiService
      .getAvailability(selectedOfficial._id)
      .then((data) => {
        setOfficialAvailability(data);
      })
      .catch((err) => {
        setAvailabilityError("Failed to fetch availability");
        setOfficialAvailability([]);
      })
      .finally(() => setAvailabilityLoading(false));
  }, [selectedOfficial?._id]);

  const filteredOfficials = officials.filter((official) => {
    return (
      (filters.sport === "" ||
        (official.sports &&
          official.sports
            .join(", ")
            .toLowerCase()
            .includes(filters.sport.toLowerCase()))) &&
      (filters.city === "" ||
        (official.location &&
          official.location.toLowerCase().includes(filters.city.toLowerCase())))
    );
  });

  const getSportIcon = (sport) => {
    const icons = {
      Football: "⚽",
      Cricket: "🏏",
      Basketball: "🏀",
      Tennis: "🎾",
    };
    return icons[sport] || "🏆";
  };

  const getRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    return "⭐".repeat(fullStars) + (hasHalfStar ? "⭐" : "");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <OrganizerNavbar />

      <main className="flex-1 ml-64 p-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#0B405B] mb-2">
            🔍 Search Officials
          </h1>
          <p className="text-gray-600 text-lg">
            Find and book qualified sports officials for your events
          </p>
        </div>

        {/* Search Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">
                  Total Officials
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {officials.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white text-xl">
                👥
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">
                  Available Now
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredOfficials.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white text-xl">
                ✅
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">
                  Sports Covered
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(officials.map((o) => o.sports).flat()).size}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white text-xl">
                🏆
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            🔧 Filter Officials
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by sport..."
                value={filters.sport}
                onChange={(e) =>
                  setFilters({ ...filters, sport: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#94D82A] focus:border-transparent transition-all"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                ⚽
              </span>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by location..."
                value={filters.city}
                onChange={(e) =>
                  setFilters({ ...filters, city: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#94D82A] focus:border-transparent transition-all"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                📍
              </span>
            </div>
          </div>
        </div>

        {/* Detailed View */}
        {selectedOfficial ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-[#0B405B] to-[#0a364d] text-white p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                    {getSportIcon(selectedOfficial.sports[0])}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">
                      {selectedOfficial.name}
                    </h2>
                    <p className="text-blue-100 text-lg">
                      {selectedOfficial.role} •{" "}
                      {selectedOfficial.sports.join(", ")}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedOfficial(null)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Basic Info */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      📋 Profile Details
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <span className="w-6 text-center mr-3">📍</span>
                        <span className="font-medium text-gray-700">
                          Location:
                        </span>
                        <span className="ml-2 text-gray-900">
                          {selectedOfficial.location}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-6 text-center mr-3">⏱️</span>
                        <span className="font-medium text-gray-700">
                          Experience:
                        </span>
                        <span className="ml-2 text-gray-900">
                          {selectedOfficial.experience}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-6 text-center mr-3">🏅</span>
                        <span className="font-medium text-gray-700">
                          Certifications:
                        </span>
                        <span className="ml-2 text-gray-900">
                          {selectedOfficial.certifications}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-6 text-center mr-3">📞</span>
                        <span className="font-medium text-gray-700">
                          Phone:
                        </span>
                        <span className="ml-2 text-gray-900">
                          {selectedOfficial.phone}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-6 text-center mr-3">📧</span>
                        <span className="font-medium text-gray-700">
                          Email:
                        </span>
                        <span className="ml-2 text-gray-900">
                          {selectedOfficial.email}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Performance Stats */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      📊 Performance Stats
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {selectedOfficial.rating}
                        </div>
                        <div className="text-blue-500 text-sm">Rating</div>
                        <div className="text-lg">
                          {getRatingStars(selectedOfficial.rating)}
                        </div>
                      </div>
                      <div className="bg-green-50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {selectedOfficial.matches}
                        </div>
                        <div className="text-green-500 text-sm">Matches</div>
                        <div className="text-lg">🏆</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-yellow-50 rounded-xl p-4">
                    <h4 className="font-bold text-yellow-800 mb-2">
                      🕒 Availability
                    </h4>
                    {availabilityLoading ? (
                      <p className="text-yellow-700">Loading availability...</p>
                    ) : availabilityError ? (
                      <p className="text-red-600">{availabilityError}</p>
                    ) : (
                      (() => {
                        // Only show future/present availabilities
                        const now = new Date();
                        const futureAvail = officialAvailability.filter(
                          (a) => new Date(a.endDate) >= now
                        );
                        if (futureAvail.length === 0) {
                          return (
                            <p className="text-yellow-700 font-semibold">
                              Not available
                            </p>
                          );
                        }
                        return (
                          <ul className="text-yellow-700 space-y-1">
                            {futureAvail.map((a) => (
                              <li key={a._id}>
                                {new Date(a.startDate).toLocaleString()} -{" "}
                                {new Date(a.endDate).toLocaleString()}
                              </li>
                            ))}
                          </ul>
                        );
                      })()
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="flex-1 bg-gradient-to-r from-[#94D82A] to-[#7BC226] text-[#0B405B] py-4 px-6 rounded-xl hover:shadow-lg transition-all duration-300 font-bold text-lg"
                >
                  📅 Book Now
                </button>
                <button
                  onClick={() => alert("Message sent!")}
                  className="flex-1 border-2 border-[#0B405B] text-[#0B405B] py-4 px-6 rounded-xl hover:bg-[#0B405B] hover:text-white transition-all duration-300 font-bold text-lg"
                >
                  💬 Send Message
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Officials Grid */
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-8 py-6 bg-gradient-to-r from-[#0B405B] to-[#0a364d] text-white">
              <h2 className="text-2xl font-bold mb-2">
                👥 Available Officials
              </h2>
              <p className="text-blue-100">
                Click on any official to view detailed profile
              </p>
            </div>

            <div className="p-8">
              {loading ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">⚙️</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Loading officials...
                  </h3>
                  <p className="text-gray-500 text-lg">
                    Please wait while we fetch the officials.
                  </p>
                </div>
              ) : error ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">❌</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Error: {error}
                  </h3>
                  <p className="text-gray-500 text-lg">
                    Failed to fetch officials. Please try again later.
                  </p>
                </div>
              ) : filteredOfficials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredOfficials.map((official) => (
                    <div
                      key={official._id}
                      className="group border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-white to-gray-50 hover:from-blue-50 hover:to-white"
                      onClick={() => setSelectedOfficial(official)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl group-hover:bg-blue-200 transition-colors">
                          {getSportIcon(official.sports[0])}
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Rating</div>
                          <div className="font-bold text-gray-900">
                            {official.rating}
                          </div>
                        </div>
                      </div>

                      <h3 className="font-bold text-xl text-gray-900 group-hover:text-[#0B405B] transition-colors mb-2">
                        {official.name}
                      </h3>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-600">
                          <span className="mr-2">🏆</span>
                          <span className="text-sm">
                            {official.sports.join(", ")} - {official.role}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <span className="mr-2">📍</span>
                          <span className="text-sm">{official.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <span className="mr-2">⏱️</span>
                          <span className="text-sm">{official.experience}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="text-sm text-gray-500">
                          {official.matches} matches
                        </div>
                        <div className="text-sm font-medium text-[#94D82A]">
                          View Details →
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">🔍</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    No officials found
                  </h3>
                  <p className="text-gray-500 text-lg">
                    Try adjusting your search filters to find more officials.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setShowBookingModal(false)}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4 text-[#0B405B]">
              Book Official
            </h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setBookingLoading(true);
                setBookingError("");
                setBookingSuccess("");
                try {
                  const token = apiService.getToken();
                  const response = await fetch(
                    "http://localhost:5000/api/booking",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                      body: JSON.stringify({
                        officialId: selectedOfficial._id,
                        event: {
                          name: bookingForm.name,
                          date: bookingForm.date,
                          location: bookingForm.location,
                          sport: bookingForm.sport,
                          details: bookingForm.details,
                        },
                        message: bookingForm.message,
                      }),
                    }
                  );
                  if (!response.ok) {
                    const data = await response.json().catch(() => ({}));
                    throw new Error(
                      data.message || "Failed to send booking request"
                    );
                  }
                  setBookingSuccess("Booking request sent successfully!");
                  setShowBookingModal(false);
                  setBookingForm({
                    name: "",
                    date: "",
                    location: "",
                    sport: "",
                    details: "",
                    message: "",
                  });
                } catch (err) {
                  setBookingError(
                    err.message || "Error sending booking request"
                  );
                } finally {
                  setBookingLoading(false);
                }
              }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Event Name"
                value={bookingForm.name}
                onChange={(e) =>
                  setBookingForm({ ...bookingForm, name: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
              <input
                type="date"
                placeholder="Event Date"
                value={bookingForm.date}
                onChange={(e) =>
                  setBookingForm({ ...bookingForm, date: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
              <input
                type="text"
                placeholder="Location"
                value={bookingForm.location}
                onChange={(e) =>
                  setBookingForm({ ...bookingForm, location: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
              <input
                type="text"
                placeholder="Sport"
                value={bookingForm.sport}
                onChange={(e) =>
                  setBookingForm({ ...bookingForm, sport: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
              <textarea
                placeholder="Event Details (optional)"
                value={bookingForm.details}
                onChange={(e) =>
                  setBookingForm({ ...bookingForm, details: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <textarea
                placeholder="Message to Official (optional)"
                value={bookingForm.message}
                onChange={(e) =>
                  setBookingForm({ ...bookingForm, message: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              {bookingError && (
                <div className="text-red-600">{bookingError}</div>
              )}
              {bookingSuccess && (
                <div className="text-green-600">{bookingSuccess}</div>
              )}
              <button
                type="submit"
                className="w-full bg-[#0B405B] text-white py-3 rounded-lg font-bold hover:bg-[#09405B] transition-colors"
                disabled={bookingLoading}
              >
                {bookingLoading ? "Sending..." : "Send Booking Request"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
