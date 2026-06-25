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
    <div>
      <h2 className="text-2xl font-bold mb-4">Approve/Decline Profiles</h2>
      <p>Approve or decline new official and organizer profiles here.</p>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : pendingOfficials.length === 0 ? (
        <p>No pending profiles.</p>
      ) : (
        <div className="space-y-4 mt-4">
          {pendingOfficials.map((official) => (
            <div key={official._id} className="border p-4 rounded shadow">
              <div className="font-semibold">{official.name}</div>
              <div>Email: {official.email}</div>
              <div>Phone: {official.phone || "-"}</div>
              <div>Sports: {official.sports?.join(", ") || "-"}</div>
              <div>
                Role: <span className="font-semibold uppercase text-blue-600">{official.role}</span>
              </div>
              <div>Status: <span className="font-bold text-yellow-600">Pending</span></div>
              <div className="mt-2 space-x-2">
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:opacity-50"
                  onClick={() => handleAction(official._id, "approve")}
                  disabled={actionLoading[official._id]}
                >
                  Approve
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
                  onClick={() => handleAction(official._id, "decline")}
                  disabled={actionLoading[official._id]}
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApproveDeclineProfiles; 