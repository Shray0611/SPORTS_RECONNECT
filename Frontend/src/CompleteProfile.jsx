import React, { useState } from 'react';

const CompleteProfile = () => {
  const [sports, setSports] = useState([]);
  const [location, setLocation] = useState('e.g., London, UK');
  const [experience, setExperience] = useState('e.g., 5');
  const [availability, setAvailability] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ sports, location, experience, availability });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Complete Your Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Sports</label>
            <div className="mt-1 space-y-2">
              {['Cricket', 'Football', 'Basketball', 'Tennis', 'Volleyball'].map((sport) => (
                <div key={sport}>
                  <input
                    type="checkbox"
                    id={sport}
                    value={sport}
                    onChange={(e) => {
                      if (e.target.checked) setSports([...sports, sport]);
                      else setSports(sports.filter((s) => s !== sport));
                    }}
                    className="mr-2"
                  />
                  <label htmlFor={sport}>{sport}</label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
            <input
              type="text"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Set Your Availability</label>
            <div className="mt-1 p-2 border border-gray-300 rounded-md h-32 flex items-center justify-center text-gray-500">
              Calendar UI Placeholder
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;