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
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./admin/Dashboard";
import RegisteredOfficials from "./admin/RegisteredOfficials";
import ApproveDeclineProfiles from "./admin/ApproveDeclineProfiles";
import ManualBookingManagement from "./admin/ManualBookingManagement";
import AdminReviews from "./admin/AdminReviews";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />


          {/* Role-specific Routes */}
          <Route
            path="/official/dashboard"
            element={
              <ProtectedRoute allowedRoles={["official"]}>
                <OfficalsHomepage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/organizer/dashboard"
            element={
              <ProtectedRoute allowedRoles={["organizer"]}>
                <OrgDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminPanel />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="registered-officials" element={<RegisteredOfficials />} />
            <Route path="approve-decline-profiles" element={<ApproveDeclineProfiles />} />
            <Route path="manual-booking-management" element={<ManualBookingManagement />} />
            <Route path="reviews" element={<AdminReviews />} />
          </Route>

          {/* Multi-role Routes */}
          <Route
            path="/search-officials"
            element={
              <ProtectedRoute allowedRoles={["organizer", "admin"]}>
                <SearchOfficials />
              </ProtectedRoute>
            }
          />

          {/* Catch-all route - redirect to home */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
