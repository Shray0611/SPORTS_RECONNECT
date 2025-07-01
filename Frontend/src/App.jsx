import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import RegisterForm from "./RegisterForm";
import CompleteProfile from "./CompleteProfile";
import AdminPanel from "./AdminPanel";
import SearchDiscover from "./SearchDiscover";
import BookingOversight from "./BookingOversight";
import Dashboard from "./Dashboard";
import OfficialDetails from "./OfficialDetails";
import Login from "./Login";
import Register from "./Register";
import OfficalsHomepage from "./OfficalsHomepage";
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />{" "}
          {/* Default route - HomePage */}
          {/* <Route path="/register" element={<RegisterForm />} /> */}
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/search-discover" element={<SearchDiscover />} />
          <Route path="/booking-oversight" element={<BookingOversight />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/official-details" element={<OfficialDetails />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/OfficalsHomepage" element={<OfficalsHomepage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
