import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import CompleteProfile from "./CompleteProfile";
import AdminPanel from "./AdminPanel";
import OrganizerNavbar from "./OrganizerNavbar";
import SearchOfficials from "./SearchOfficials";
import OrgDashboard from "./OrgDashboard";
import Login from "./Login";
import Register from "./Register";
import OfficalsHomepage from "./OfficalsHomepage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/complete-profile"
            element={
              <ProtectedRoute>
                <CompleteProfile />
              </ProtectedRoute>
            }
          />

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
          />

          {/* Legacy Routes - Redirect to new structure */}
          <Route
            path="/OfficalsHomepage"
            element={
              <ProtectedRoute allowedRoles={["official"]}>
                <OfficalsHomepage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/OrgDashboard"
            element={
              <ProtectedRoute allowedRoles={["organizer"]}>
                <OrgDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-panel"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />

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
