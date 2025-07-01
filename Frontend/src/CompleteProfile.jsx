import React, { useState } from 'react';

const CompleteProfile = () => {
  const [sports, setSports] = useState([]);
  const [location, setLocation] = useState('e.g., London, UK');
  const [experience, setExperience] = useState('e.g., 5');
  const [availability, setAvailability] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ sports, location, experience, availability });
  };

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dates = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A3C54] to-[#2E5C6A] text-white flex flex-col items-center justify-center p-6">
      <div className="bg-gray-800/70 rounded-2xl shadow-2xl p-8 max-w-4xl w-full transform transition-all duration-300 hover:scale-102">
        <h2 className="text-2xl font-bold text-[#94D82A] mb-6 text-center animate-pulse">Complete Your Profile</h2>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-4">
            <div className="bg-gray-700/50 p-5 rounded-xl shadow-lg">
              <label className="block text-sm font-medium mb-3">Select Sports</label>
              <div className="space-y-2">
                {['Cricket', 'Football', 'Basketball', 'Tennis', 'Volleyball'].map((sport) => (
                  <div key={sport} className="flex items-center">
                    <input
                      type="checkbox"
                      id={sport}
                      value={sport}
                      onChange={(e) => {
                        if (e.target.checked) setSports([...sports, sport]);
                        else setSports(sports.filter((s) => s !== sport));
                      }}
                      className="mr-2 h-4 w-4 text-[#94D82A] border-gray-600 rounded focus:ring-[#94D82A] transition duration-200"
                    />
                    <label htmlFor={sport} className="text-white text-base">{sport}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <div className="bg-gray-700/50 p-5 rounded-xl shadow-lg">
              <label className="block text-sm font-medium mb-3">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#94D82A] transition duration-200 text-base"
                placeholder="e.g., London, UK"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <div className="bg-gray-700/50 p-5 rounded-xl shadow-lg">
              <label className="block text-sm font-medium mb-3">Years of Experience</label>
              <input
                type="number"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#94D82A] transition duration-200 text-base"
                placeholder="e.g., 5"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <div className="bg-gray-700/50 p-5 rounded-xl shadow-lg">
              <label className="block text-sm font-medium mb-3">Set Your Availability</label>
              <div
                className="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg cursor-pointer hover:bg-gray-500 transition duration-200"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                {showCalendar ? (
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {days.map((day) => (
                      <div key={day} className="text-gray-400 text-sm">{day}</div>
                    ))}
                    {dates.map((date) => (
                      <div
                        key={date}
                        className="p-1 hover:bg-[#94D82A] hover:text-gray-900 rounded-full transition duration-200"
                        onClick={() => setAvailability(`${date}/07/2025`)}
                      >
                        {date}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-400 text-center text-sm">Click to select a date</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-[#94D82A] text-gray-900 p-3 rounded-lg font-medium text-base hover:bg-green-500 transition duration-200 shadow-md hover:shadow-lg mt-6"
          onClick={handleSubmit}
        >
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default CompleteProfile;