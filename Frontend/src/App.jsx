import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import CompleteProfile from "./CompleteProfile";
import AdminPanel from "./AdminPanel";
import OrganizerNavbar from "./OrganizerNavbar";
import SearchOfficials from "./SearchOfficials";
import OrgDashboard from "./OrgDashboard"

import Login from "./Login";
import Register from "./Register";
import OfficalsHomepage from "./OfficalsHomepage";
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />{" "}
          {/* Default route - HomePage */}
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/OrgDashboard" element={<OrgDashboard />} /> {/* updated route */}
          <Route path="/search-officials" element={<SearchOfficials />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/OfficalsHomepage" element={<OfficalsHomepage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
