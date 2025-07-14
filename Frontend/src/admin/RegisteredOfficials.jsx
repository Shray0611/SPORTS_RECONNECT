import React, { useEffect, useState } from "react";
import apiService from "../services/api";

const RegisteredOfficials = () => {
  const [officials, setOfficials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOfficials = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiService.getOfficials();
        setOfficials(data.officials || []);
      } catch (err) {
        setError(err.message || "Failed to fetch officials");
      } finally {
        setLoading(false);
      }
    };
    fetchOfficials();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Registered Officials</h2>
      {loading && <p>Loading officials...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Location</th>
                <th className="px-4 py-2 border">Sports</th>
              </tr>
            </thead>
            <tbody>
              {officials.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">No officials found.</td>
                </tr>
              ) : (
                officials.map((official) => (
                  <tr key={official._id}>
                    <td className="px-4 py-2 border">{official.name}</td>
                    <td className="px-4 py-2 border">{official.email}</td>
                    <td className="px-4 py-2 border">{official.location || '-'}</td>
                    <td className="px-4 py-2 border">{official.sports && official.sports.length > 0 ? official.sports.join(", ") : '-'}</td>
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

export default RegisteredOfficials; 