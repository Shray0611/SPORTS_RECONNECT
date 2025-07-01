import React, { useState } from "react";
import OrganizerNavbar from "./OrganizerNavbar";

const dummyOfficials = [
  { 
    id: 1, 
    name: "John Doe", 
    sport: "Football", 
    role: "Referee", 
    city: "Mumbai", 
    experience: "5 years", 
    certifications: "AIFF Certified", 
    availability: "Weekends",
    rating: 4.8,
    matches: 120,
    phone: "+91 98765 43210",
    email: "john.doe@email.com"
  },
  { 
    id: 2, 
    name: "Jane Smith", 
    sport: "Cricket", 
    role: "Umpire", 
    city: "Pune", 
    experience: "3 years", 
    certifications: "BCCI Certified", 
    availability: "Weekdays",
    rating: 4.6,
    matches: 85,
    phone: "+91 87654 32109",
    email: "jane.smith@email.com"
  },
  { 
    id: 3, 
    name: "Amit Sharma", 
    sport: "Basketball", 
    role: "Referee", 
    city: "Delhi", 
    experience: "4 years", 
    certifications: "FIBA Certified", 
    availability: "Evenings",
    rating: 4.9,
    matches: 95,
    phone: "+91 76543 21098",
    email: "amit.sharma@email.com"
  },
  { 
    id: 4, 
    name: "Priya Patel", 
    sport: "Tennis", 
    role: "Line Judge", 
    city: "Mumbai", 
    experience: "6 years", 
    certifications: "ITF Certified", 
    availability: "Flexible",
    rating: 4.7,
    matches: 150,
    phone: "+91 65432 10987",
    email: "priya.patel@email.com"
  },
  { 
    id: 5, 
    name: "Rahul Kumar", 
    sport: "Football", 
    role: "Assistant Referee", 
    city: "Bangalore", 
    experience: "2 years", 
    certifications: "AIFF Certified", 
    availability: "Weekends",
    rating: 4.4,
    matches: 45,
    phone: "+91 54321 09876",
    email: "rahul.kumar@email.com"
  },
];

export default function SearchOfficials() {
  const [filters, setFilters] = useState({ sport: "", role: "", city: "", date: "" });
  const [selectedOfficial, setSelectedOfficial] = useState(null);

  const filteredOfficials = dummyOfficials.filter((official) => {
    return (
      (filters.sport === "" || official.sport.toLowerCase().includes(filters.sport.toLowerCase())) &&
      (filters.role === "" || official.role.toLowerCase().includes(filters.role.toLowerCase())) &&
      (filters.city === "" || official.city.toLowerCase().includes(filters.city.toLowerCase()))
    );
  });

  const getSportIcon = (sport) => {
    const icons = {
      "Football": "⚽",
      "Cricket": "🏏",
      "Basketball": "🏀",
      "Tennis": "🎾"
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
                <p className="text-gray-500 text-sm font-medium mb-1">Total Officials</p>
                <p className="text-2xl font-bold text-gray-900">{dummyOfficials.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white text-xl">
                👥
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Available Now</p>
                <p className="text-2xl font-bold text-gray-900">{filteredOfficials.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white text-xl">
                ✅
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Sports Covered</p>
                <p className="text-2xl font-bold text-gray-900">4</p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white text-xl">
                🏆
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">🔧 Filter Officials</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by sport..."
                value={filters.sport}
                onChange={(e) => setFilters({ ...filters, sport: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#94D82A] focus:border-transparent transition-all"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">⚽</span>
            </div>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search by role..."
                value={filters.role}
                onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#94D82A] focus:border-transparent transition-all"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">👔</span>
            </div>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search by city..."
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#94D82A] focus:border-transparent transition-all"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">📍</span>
            </div>
            
            <div className="relative">
              <input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#94D82A] focus:border-transparent transition-all"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">📅</span>
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
                    {getSportIcon(selectedOfficial.sport)}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{selectedOfficial.name}</h2>
                    <p className="text-blue-100 text-lg">{selectedOfficial.role} • {selectedOfficial.sport}</p>
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
                    <h3 className="text-xl font-bold text-gray-900 mb-4">📋 Profile Details</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <span className="w-6 text-center mr-3">📍</span>
                        <span className="font-medium text-gray-700">Location:</span>
                        <span className="ml-2 text-gray-900">{selectedOfficial.city}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-6 text-center mr-3">⏱️</span>
                        <span className="font-medium text-gray-700">Experience:</span>
                        <span className="ml-2 text-gray-900">{selectedOfficial.experience}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-6 text-center mr-3">🏅</span>
                        <span className="font-medium text-gray-700">Certifications:</span>
                        <span className="ml-2 text-gray-900">{selectedOfficial.certifications}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-6 text-center mr-3">📞</span>
                        <span className="font-medium text-gray-700">Phone:</span>
                        <span className="ml-2 text-gray-900">{selectedOfficial.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-6 text-center mr-3">📧</span>
                        <span className="font-medium text-gray-700">Email:</span>
                        <span className="ml-2 text-gray-900">{selectedOfficial.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Performance Stats */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Performance Stats</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">{selectedOfficial.rating}</div>
                        <div className="text-blue-500 text-sm">Rating</div>
                        <div className="text-lg">{getRatingStars(selectedOfficial.rating)}</div>
                      </div>
                      <div className="bg-green-50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">{selectedOfficial.matches}</div>
                        <div className="text-green-500 text-sm">Matches</div>
                        <div className="text-lg">🏆</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 rounded-xl p-4">
                    <h4 className="font-bold text-yellow-800 mb-2">🕒 Availability</h4>
                    <p className="text-yellow-700">{selectedOfficial.availability}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => alert("Booking request sent!")}
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
              <h2 className="text-2xl font-bold mb-2">👥 Available Officials</h2>
              <p className="text-blue-100">Click on any official to view detailed profile</p>
            </div>

            <div className="p-8">
              {filteredOfficials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredOfficials.map((official) => (
                    <div
                      key={official.id}
                      className="group border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-white to-gray-50 hover:from-blue-50 hover:to-white"
                      onClick={() => setSelectedOfficial(official)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl group-hover:bg-blue-200 transition-colors">
                          {getSportIcon(official.sport)}
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Rating</div>
                          <div className="font-bold text-gray-900">{official.rating}</div>
                        </div>
                      </div>
                      
                      <h3 className="font-bold text-xl text-gray-900 group-hover:text-[#0B405B] transition-colors mb-2">
                        {official.name}
                      </h3>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-600">
                          <span className="mr-2">🏆</span>
                          <span className="text-sm">{official.sport} - {official.role}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <span className="mr-2">📍</span>
                          <span className="text-sm">{official.city}</span>
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No officials found</h3>
                  <p className="text-gray-500 text-lg">Try adjusting your search filters to find more officials.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}