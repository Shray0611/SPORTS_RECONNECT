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
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-white p-4 shadow-lg">
        <h3 className="text-lg font-bold mb-4">Officials Hub</h3>
        <nav className="space-y-2">
          <Link to="/dashboard" className="block p-2 bg-gray-200 rounded">
            Dashboard
          </Link>
          <Link to="/search-discover" className="block p-2 bg-gray-200 rounded">
            Search & Discover
          </Link>
          <Link
            to="/complete-profile"
            className="block p-2 bg-gray-200 rounded"
          >
            Profile
          </Link>
          <Link
            to="/booking-oversight"
            className="block p-2 bg-gray-200 rounded"
          >
            Availability
          </Link>
          <Link
            to="/booking-oversight"
            className="block p-2 bg-gray-200 rounded"
          >
            Booking Requests
          </Link>
          <Link to="/dashboard" className="block p-2 bg-gray-200 rounded">
            History
          </Link>
          <Link to="/dashboard" className="block p-2 bg-gray-200 rounded">
            Notifications
          </Link>
          <Link
            to="/official-details"
            className="block p-2 bg-gray-200 rounded"
          >
            Settings
          </Link>
        </nav>
      </div>
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Filters</h2>
        <form
          onSubmit={handleSearch}
          className="bg-white p-4 rounded-lg shadow mb-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sport
            </label>
            <input
              type="text"
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="e.g., Basketball"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="e.g., New York"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Experience
            </label>
            <input
              type="text"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="e.g., 5+ years"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Availability
            </label>
            <div className="mt-1 p-2 border border-gray-300 rounded-md h-32 flex items-center justify-center text-gray-500">
              Select a date
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Search Officials
          </button>
        </form>
        <h3 className="text-lg font-medium mb-2">Search Results</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {officials.map((official, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <p>{official.name}</p>
              <p>{official.sport}</p>
              <p>{official.role}</p>
              <p>{official.location}</p>
              <p>{official.experience}</p>
              <div className="mt-2 space-x-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded">
                  View Profile
                </button>
                <button className="bg-green-500 text-white px-2 py-1 rounded">
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
