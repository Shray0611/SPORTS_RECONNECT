import React, { useState, useEffect } from "react";
import OrganizerNavbar from "./OrganizerNavbar";
import apiService from "../services/api";
import ChatInterface from "../components/ChatInterface";

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

  // Review states
  const [officialReviews, setOfficialReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsError, setReviewsError] = useState("");
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    reviewText: "",
    eventName: "",
  });
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSubmitError, setReviewSubmitError] = useState("");
  const [reviewSubmitSuccess, setReviewSubmitSuccess] = useState("");

  const [showChatInterface, setShowChatInterface] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("userData") || "{}");
  const [organizerBookings, setOrganizerBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await apiService.getSentBookings();
        setOrganizerBookings(data.bookings || []);
      } catch (error) {
        console.error("Failed to fetch organizer bookings", error);
      }
    };
    fetchBookings();
  }, []);

  useEffect(() => {
    const fetchOfficials = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await apiService.getAllOfficials();
        setOfficials(data.officials || []);
      } catch (err) {
        setError(err.message || "Error fetching officials");
      } finally {
        setLoading(false);
      }
    };
    fetchOfficials();
  }, []);

  const fetchReviews = async (officialId) => {
    setReviewsLoading(true);
    setReviewsError("");
    try {
      const data = await apiService.getReviewsForOfficial(officialId);
      setOfficialReviews(data.reviews || []);
    } catch (err) {
      setReviewsError(err.message || "Failed to fetch reviews");
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedOfficial?._id) {
      setOfficialReviews([]);
      return;
    }
    fetchReviews(selectedOfficial._id);
  }, [selectedOfficial?._id]);

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

              {/* Reviews Section */}
              <div className="mt-12 border-t border-gray-100 pt-8">
                <h3 className="text-2xl font-bold text-[#0B405B] mb-6">
                  ⭐ Reviews & Ratings
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Reviews List (Columns span 2) */}
                  <div className="lg:col-span-2 space-y-4">
                    <h4 className="font-bold text-gray-800 text-lg mb-2">Organizer Reviews</h4>
                    {reviewsLoading ? (
                      <p className="text-gray-500">Loading reviews...</p>
                    ) : reviewsError ? (
                      <p className="text-red-500">{reviewsError}</p>
                    ) : officialReviews.length === 0 ? (
                      <p className="text-gray-500 italic">No reviews yet for this official. Be the first to write one!</p>
                    ) : (
                      <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2">
                        {officialReviews.map((r) => (
                          <div key={r._id} className="bg-gray-50 rounded-xl p-4 border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <span className="font-bold text-gray-900">{r.organizer?.name || "Anonymous Organizer"}</span>
                                {r.eventName && (
                                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full ml-2 font-medium">
                                    {r.eventName}
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-gray-400">
                                {new Date(r.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="text-yellow-500 mb-2 font-bold text-sm">
                              {getRatingStars(r.rating)} <span className="text-gray-700 ml-1">({r.rating}.0)</span>
                            </div>
                            <p className="text-gray-700 text-sm italic">"{r.reviewText}"</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit Review Form (Columns span 1) */}
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 self-start shadow-sm">
                    <h4 className="font-bold text-gray-900 text-lg mb-4">Write a Review</h4>
                    {(() => {
                      const canReview = organizerBookings.some(b => {
                        return b.official?._id === selectedOfficial._id && 
                               b.status === "accepted" && 
                               new Date(b.event?.date) < new Date();
                      });
                      
                      if (!canReview) {
                        return (
                          <div className="text-sm text-gray-600 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                            <span className="block mb-2 text-xl">🔒</span>
                            You can only review officials after an accepted event is completed. 
                            If you have an upcoming event, please wait until the scheduled time is over to rate them.
                          </div>
                        );
                      }
                      
                      return (
                        <form
                          onSubmit={async (e) => {
                            e.preventDefault();
                            if (!reviewForm.reviewText) return;
                            setReviewSubmitting(true);
                            setReviewSubmitError("");
                            setReviewSubmitSuccess("");
                            try {
                              await apiService.createReview({
                                officialId: selectedOfficial._id,
                                rating: Number(reviewForm.rating),
                                reviewText: reviewForm.reviewText,
                                eventName: reviewForm.eventName,
                              });
                              
                              setReviewSubmitSuccess("Review submitted successfully!");
                              setReviewForm({
                                rating: 5,
                                reviewText: "",
                                eventName: "",
                              });

                              // Refresh reviews list
                              await fetchReviews(selectedOfficial._id);
                              
                              // Refresh officials list
                              const data = await apiService.getAllOfficials();
                              setOfficials(data.officials || []);
                              
                              // Update selected official object to show new average rating
                              const updated = (data.officials || []).find(o => o._id === selectedOfficial._id);
                              if (updated) {
                                setSelectedOfficial(updated);
                              }
                            } catch (err) {
                              setReviewSubmitError(err.message || "Failed to submit review");
                            } finally {
                              setReviewSubmitting(false);
                            }
                          }}
                          className="space-y-4"
                        >
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">RATING</label>
                        <select
                          value={reviewForm.rating}
                          onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-700 text-sm focus:ring-2 focus:ring-[#94D82A]"
                        >
                          <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                          <option value="4">⭐⭐⭐⭐ (4/5)</option>
                          <option value="3">⭐⭐⭐ (3/5)</option>
                          <option value="2">⭐⭐ (2/5)</option>
                          <option value="1">⭐ (1/5)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">EVENT NAME (OPTIONAL)</label>
                        <input
                          type="text"
                          placeholder="e.g. Football League Finals"
                          value={reviewForm.eventName}
                          onChange={(e) => setReviewForm({ ...reviewForm, eventName: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#94D82A]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">YOUR REVIEW</label>
                        <textarea
                          placeholder="Share your experience working with this official..."
                          value={reviewForm.reviewText}
                          onChange={(e) => setReviewForm({ ...reviewForm, reviewText: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#94D82A]"
                          rows="3"
                          required
                        />
                      </div>

                      {reviewSubmitError && (
                        <p className="text-red-500 text-xs">{reviewSubmitError}</p>
                      )}
                      {reviewSubmitSuccess && (
                        <p className="text-green-500 text-xs font-medium">{reviewSubmitSuccess}</p>
                      )}

                      <button
                        type="submit"
                        disabled={reviewSubmitting}
                        className="w-full bg-[#0B405B] text-white py-2.5 rounded-lg hover:bg-[#0a364d] font-bold text-sm transition-colors"
                      >
                        {reviewSubmitting ? "Submitting..." : "Submit Review"}
                      </button>
                    </form>
                    );
                   })()}
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
                  onClick={() => setShowChatInterface(true)}
                  className="flex-1 border-2 border-[#0B405B] text-[#0B405B] py-4 px-6 rounded-xl hover:bg-[#0B405B] hover:text-white transition-all duration-300 font-bold text-lg"
                >
                  💬 Chat
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
                  const selectedDateTime = new Date(`${bookingForm.date}T${bookingForm.time}`);
                  
                  // Validate availability frontend
                  const isAvailable = officialAvailability.some(a => {
                    const start = new Date(a.startDate);
                    const end = new Date(a.endDate);
                    return selectedDateTime >= start && selectedDateTime <= end;
                  });

                  if (!isAvailable) {
                    throw new Error("This official is not available at the selected date and time.");
                  }

                  await apiService.createBookingRequest({
                    officialId: selectedOfficial._id,
                    event: {
                      name: bookingForm.name,
                      date: `${bookingForm.date}T${bookingForm.time}`,
                      location: bookingForm.location,
                      sport: bookingForm.sport,
                      details: bookingForm.details,
                    },
                    message: bookingForm.message,
                  });
                  setBookingSuccess("Booking request sent successfully!");
                  setShowBookingModal(false);
                  setBookingForm({
                    name: "",
                    date: "",
                    time: "",
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
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">EVENT DATE</label>
                  <input
                    type="date"
                    value={bookingForm.date}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, date: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">EVENT TIME</label>
                  <input
                    type="time"
                    value={bookingForm.time}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, time: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    required
                  />
                </div>
              </div>
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
      {showChatInterface && selectedOfficial && (
        <ChatInterface 
          onClose={() => setShowChatInterface(false)} 
          initialContact={selectedOfficial}
          currentUserRole="organizer" 
        />
      )}
    </div>
  );
}
