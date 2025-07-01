import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./HomePage";
import RegisterForm from "./RegisterForm";
import CompleteProfile from "./CompleteProfile";
import AdminPanel from "./AdminPanel";
import SearchDiscover from "./SearchDiscover";
import BookingOversight from "./BookingOversight";
import Dashboard from "./DashBoard";
import OfficialDetails from "./OfficialDetails";
import Login from "./Login";
import Register from "./Register";
import OfficalsHomepage from "./OfficalsHomepage";
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navigation (optional, can be moved to a separate Navbar component) */}
        <nav className="bg-white p-4 shadow-lg">
          <ul className="flex space-x-4">
            <li>
              <Link to="/register" className="text-blue-600 hover:underline">
                Register
              </Link>
            </li>
            <li>
              <Link
                to="/complete-profile"
                className="text-blue-600 hover:underline"
              >
                Complete Profile
              </Link>
            </li>
            <li>
              <Link to="/admin-panel" className="text-blue-600 hover:underline">
                Admin Panel
              </Link>
            </li>
            <li>
              <Link
                to="/search-discover"
                className="text-blue-600 hover:underline"
              >
                Search & Discover
              </Link>
            </li>
            <li>
              <Link
                to="/booking-oversight"
                className="text-blue-600 hover:underline"
              >
                Booking Oversight
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="text-blue-600 hover:underline">
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/official-details"
                className="text-blue-600 hover:underline"
              >
                Official Details
              </Link>
            </li>
          </ul>
        </nav>

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
          <Route path="/officalsHomePage" element={<OfficalsHomepage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
