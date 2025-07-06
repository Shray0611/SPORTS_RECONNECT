import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Home/HomePage";
import AdminPanel from "./admin/AdminPanel";
import OrganizerNavbar from "./organizers/OrganizerNavbar";
import SearchOfficials from "./organizers/SearchOfficials";
import OrgDashboard from "./organizers/OrgDashboard";

import Login from "./auth/Login";
import Register from "./auth/Register";
import OfficalsHomepage from "./officials/OfficalsHomepage";
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />{" "}
          {/* Default route - HomePage */}
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/OrgDashboard" element={<OrgDashboard />} />{" "}
          {/* updated route */}
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
