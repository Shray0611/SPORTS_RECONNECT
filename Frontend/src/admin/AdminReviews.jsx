import React, { useEffect, useState } from "react";
import apiService from "../services/api";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getAllReviews();
      setReviews(data.reviews || []);
    } catch (err) {
      setError(err.message || "Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    setActionLoading(id);
    try {
      await apiService.deleteReview(id);
      setReviews((prev) => prev.filter((r) => r._id !== id));
      alert("Review deleted successfully");
    } catch (err) {
      alert(err.message || "Failed to delete review");
    } finally {
      setActionLoading(null);
    }
  };

  const getRatingStars = (rating) => {
    return "⭐".repeat(rating);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Organizer Reviews</h2>
      {loading && <p>Loading reviews...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded">
            <thead>
              <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3 border-b text-center">Rating</th>
                <th className="px-6 py-3 border-b">Organizer</th>
                <th className="px-6 py-3 border-b">Official</th>
                <th className="px-6 py-3 border-b">Event Name</th>
                <th className="px-6 py-3 border-b">Review Text</th>
                <th className="px-6 py-3 border-b">Date</th>
                <th className="px-6 py-3 border-b text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reviews.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
                    No reviews found in the system.
                  </td>
                </tr>
              ) : (
                reviews.map((r) => (
                  <tr key={r._id} className="hover:bg-gray-50 text-sm text-gray-700">
                    <td className="px-6 py-4 border-b text-center font-bold text-yellow-500">
                      {getRatingStars(r.rating)} ({r.rating}.0)
                    </td>
                    <td className="px-6 py-4 border-b">
                      <div className="font-semibold text-gray-900">{r.organizer?.name || "N/A"}</div>
                      <div className="text-xs text-gray-400">{r.organizer?.email}</div>
                    </td>
                    <td className="px-6 py-4 border-b">
                      <div className="font-semibold text-gray-900">{r.official?.name || "N/A"}</div>
                      <div className="text-xs text-gray-400">{r.official?.email}</div>
                    </td>
                    <td className="px-6 py-4 border-b font-medium text-gray-600">
                      {r.eventName || "-"}
                    </td>
                    <td className="px-6 py-4 border-b max-w-xs italic break-words">
                      "{r.reviewText}"
                    </td>
                    <td className="px-6 py-4 border-b text-gray-500">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 border-b text-center">
                      <button
                        onClick={() => handleDelete(r._id)}
                        disabled={actionLoading === r._id}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-semibold disabled:opacity-50 transition-colors"
                      >
                        {actionLoading === r._id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminReviews;
