import React from "react";
import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", to: "/admin/dashboard" },
  { key: "registered_officials", label: "Registered Officials", to: "/admin/registered-officials" },
  { key: "approve_decline_profiles", label: "Approve/Decline Profiles", to: "/admin/approve-decline-profiles" },
  { key: "manual_booking_management", label: "Manual Booking Management", to: "/admin/manual-booking-management" },
  { key: "manage_reviews", label: "Manage Reviews", to: "/admin/reviews" },
];

const AdminNavbar = ({ onLogout }) => (
  <div className="w-64 bg-white p-4 shadow-lg flex flex-col min-h-screen">
    <h3 className="text-lg font-bold mb-4">Admin Panel</h3>
    <nav className="space-y-2 flex-1">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.key}
          to={item.to}
          className={({ isActive }) =>
            `block w-full text-left p-2 rounded ${isActive ? "bg-[#94D82A] text-[#0B405B] font-semibold" : "bg-gray-200"}`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
    <button
      onClick={onLogout}
      className="bg-[#94D82A] text-[#0B405B] px-4 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold tracking-wide mt-4"
    >
      Logout
    </button>
  </div>
);

export default AdminNavbar;
