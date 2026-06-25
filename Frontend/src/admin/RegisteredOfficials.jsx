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
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#0B405B] mb-2">
          Registered Officials 👥
        </h1>
        <p className="text-gray-600 text-lg">
          View all active officials on the platform
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 bg-gradient-to-r from-[#0B405B] to-[#0a364d] text-white">
          <h2 className="text-2xl font-bold mb-2">Directory</h2>
          <p className="text-blue-100">
            Complete list of verified officials
          </p>
        </div>

        <div className="p-8">
          {loading && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">⚙️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Loading officials...
              </h3>
            </div>
          )}
          {error && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">❌</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 text-red-500">
                {error}
              </h3>
            </div>
          )}
          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    <th className="px-6 py-4">Photo</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Sports</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {officials.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-8 text-gray-500">
                        No officials found.
                      </td>
                    </tr>
                  ) : (
                    officials.map((official) => (
                      <tr key={official._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {official.profilePhoto ? (
                            <img src={official.profilePhoto} alt={official.name} className="w-10 h-10 rounded-full object-cover border-2 border-[#94D82A]" />
                          ) : (
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: "#0B405B" }}>
                              {official.name ? official.name.split(" ").map(n => n[0]).join("") : "O"}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                          {official.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                          {official.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                          {official.location || '-'}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {official.sports && official.sports.length > 0 ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {official.sports.join(", ")}
                            </span>
                          ) : '-'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisteredOfficials; 