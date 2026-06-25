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
  <nav className="bg-[#0B405B] text-white h-screen w-64 shadow-lg flex flex-col fixed top-0 left-0 p-6 font-sans">
    <h1 className="text-2xl font-bold mb-8 tracking-tight">Admin Dashboard</h1>
    <div className="flex flex-col gap-2 flex-1">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.key}
          to={item.to}
          className={({ isActive }) =>
            `block py-3 px-3 rounded font-medium transition-colors ${
              isActive
                ? "bg-[#94D82A] text-[#0B405B]"
                : "hover:bg-[#0B405B]/50 hover:text-[#94D82A] text-white"
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </div>
    <button
      onClick={onLogout}
      className="bg-[#94D82A] text-[#0B405B] px-4 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold tracking-wide mt-auto mb-4"
    >
      Logout
    </button>
  </nav>
);

export default AdminNavbar;
