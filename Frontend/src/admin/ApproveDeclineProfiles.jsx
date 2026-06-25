import React, { useEffect, useState } from "react";
import api from "../services/api";

const ApproveDeclineProfiles = () => {
  const [pendingOfficials, setPendingOfficials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({});

  const fetchPendingOfficials = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getPendingOfficials();
      setPendingOfficials(res.officials || []);
    } catch (err) {
      setError("Failed to fetch pending officials.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingOfficials();
  }, []);

  const handleAction = async (id, action) => {
    setActionLoading((prev) => ({ ...prev, [id]: true }));
    try {
      if (action === "approve") {
        await api.approveOfficial(id);
      } else if (action === "decline") {
        await api.declineOfficial(id);
      }
      fetchPendingOfficials();
    } catch (err) {
      setError(`Failed to ${action} official.`);
    } finally {
      setActionLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#0B405B] mb-2">
          Profile Approvals 📋
        </h1>
        <p className="text-gray-600 text-lg">
          Review and verify new official and organizer registrations
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 bg-gradient-to-r from-[#0B405B] to-[#0a364d] text-white">
          <h2 className="text-2xl font-bold mb-2">Pending Profiles</h2>
          <p className="text-blue-100">
            Users waiting for administrator approval
          </p>
        </div>

        <div className="p-8">
          {loading ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">⚙️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Loading pending profiles...
              </h3>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">❌</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 text-red-500">
                {error}
              </h3>
            </div>
          ) : pendingOfficials.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">✅</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 text-gray-500">
                All caught up! No pending profiles.
              </h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingOfficials.map((official) => (
                <div key={official._id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex-shrink-0">
                      {official.profilePhoto ? (
                        <img src={official.profilePhoto} alt={official.name} className="w-14 h-14 rounded-full object-cover border-2 border-[#94D82A]" />
                      ) : (
                        <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold" style={{ backgroundColor: "#0B405B" }}>
                          {official.name ? official.name.split(" ").map(n => n[0]).join("") : "U"}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 truncate">{official.name}</h3>
                          <p className="text-gray-500 text-sm truncate">{official.email}</p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 flex-shrink-0">
                          Pending
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm">
                      <span className="font-semibold text-gray-700 w-20">Role:</span>
                      <span className="uppercase text-[#0B405B] font-bold tracking-wider">{official.role}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="font-semibold text-gray-700 w-20">Phone:</span>
                      <span className="text-gray-600">{official.phone || "Not provided"}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="font-semibold text-gray-700 w-20">Sports:</span>
                      <span className="text-gray-600 truncate">{official.sports?.join(", ") || "None"}</span>
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4 border-t border-gray-100">
                    <button
                      className="flex-1 bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                      onClick={() => handleAction(official._id, "approve")}
                      disabled={actionLoading[official._id]}
                    >
                      {actionLoading[official._id] ? "..." : "Approve"}
                    </button>
                    <button
                      className="flex-1 bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                      onClick={() => handleAction(official._id, "decline")}
                      disabled={actionLoading[official._id]}
                    >
                      {actionLoading[official._id] ? "..." : "Decline"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApproveDeclineProfiles; 