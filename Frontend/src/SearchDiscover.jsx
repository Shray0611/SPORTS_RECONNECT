import React, { useState } from "react";
import { Link } from "react-router-dom";

const SearchDiscover = () => {
  const [sport, setSport] = useState("");
  const [city, setCity] = useState("");
  const [experience, setExperience] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log({ sport, city, experience, date });
  };

  const officials = [
    {
      name: "John Doe",
      sport: "Football",
      role: "Referee",
      location: "London",
      experience: "8 years",
    },
    {
      name: "Jane Smith",
      sport: "Basketball",
      role: "Umpire",
      location: "New York",
      experience: "5 years",
    },
    {
      name: "Mike Johnson",
      sport: "Volleyball",
      role: "Scorer",
      location: "Los Angeles",
      experience: "3 years",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0B405B] to-gray-900 text-white">
      <div className="w-64 bg-gray-800/50 p-4 shadow-lg">
        <h3 className="text-lg font-bold mb-4 text-[#94D82A]">Officials Hub</h3>
        <nav className="space-y-2">
          <Link to="/dashboard" className="block p-2 bg-gray-700/50 rounded hover:bg-[#94D82A] hover:text-gray-900 transition">
            Dashboard
          </Link>
          <Link to="/search-discover" className="block p-2 bg-gray-700/50 rounded hover:bg-[#94D82A] hover:text-gray-900 transition">
            Search & Discover
          </Link>
          <Link to="/complete-profile" className="block p-2 bg-gray-700/50 rounded hover:bg-[#94D82A] hover:text-gray-900 transition">
            Profile
          </Link>
          <Link to="/booking-oversight" className="block p-2 bg-gray-700/50 rounded hover:bg-[#94D82A] hover:text-gray-900 transition">
            Availability
          </Link>
          <Link to="/booking-oversight" className="block p-2 bg-gray-700/50 rounded hover:bg-[#94D82A] hover:text-gray-900 transition">
            Booking Requests
          </Link>
          <Link to="/dashboard" className="block p-2 bg-gray-700/50 rounded hover:bg-[#94D82A] hover:text-gray-900 transition">
            History
          </Link>
          <Link to="/dashboard" className="block p-2 bg-gray-700/50 rounded hover:bg-[#94D82A] hover:text-gray-900 transition">
            Notifications
          </Link>
          <Link to="/official-details" className="block p-2 bg-gray-700/50 rounded hover:bg-[#94D82A] hover:text-gray-900 transition">
            Settings
          </Link>
        </nav>
      </div>
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4 text-[#94D82A]">Filters</h2>
        <form onSubmit={handleSearch} className="bg-gray-800/70 p-6 rounded-lg shadow-lg mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium">
              Sport
            </label>
            <input
              type="text"
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#94D82A]"
              placeholder="e.g., Basketball"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#94D82A]"
              placeholder="e.g., New York"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Experience
            </label>
            <input
              type="text"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#94D82A]"
              placeholder="e.g., 5+ years"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Date of Availability
            </label>
            <div className="mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md h-32 flex items-center justify-center text-gray-400">
              Select a date
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#94D82A] text-gray-900 p-2 rounded-md hover:bg-green-500 transition"
          >
            Search Officials
          </button>
        </form>
        <h3 className="text-lg font-medium mb-2 text-[#94D82A]">Search Results</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {officials.map((official, index) => (
            <div key={index} className="bg-gray-800/70 p-4 rounded-lg shadow-lg hover:shadow-xl transition">
              <p className="font-semibold">{official.name}</p>
              <p>{official.sport}</p>
              <p>{official.role}</p>
              <p>{official.location}</p>
              <p>{official.experience}</p>
              <div className="mt-4 space-x-2">
                <button className="bg-[#0B405B] text-white px-3 py-1 rounded hover:bg-blue-700 transition">
                  View Profile
                </button>
                <button className="bg-[#94D82A] text-gray-900 px-3 py-1 rounded hover:bg-green-500 transition">
                  Request Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchDiscover;