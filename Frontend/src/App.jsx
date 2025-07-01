import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import RegisterForm from "./RegisterForm";
import CompleteProfile from "./CompleteProfile";
import AdminPanel from "./AdminPanel";
import SearchDiscover from "./SearchDiscover";
import BookingOversight from "./BookingOversight";
import OrgDashboard from "./OrgDashboard"; // updated import
import OfficialDetails from "./OfficialDetails";
import OrganizerNavbar from "./OrganizerNavbar";
import SearchOfficials from "./SearchOfficials";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/search-discover" element={<SearchDiscover />} />
          <Route path="/booking-oversight" element={<BookingOversight />} />
          <Route path="/dashboard" element={<OrgDashboard />} /> {/* updated route */}
          <Route path="/official-details" element={<OfficialDetails />} />
          <Route path="/search-officials" element={<SearchOfficials />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
