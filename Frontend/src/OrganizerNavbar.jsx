import React from "react";
import { Link } from "react-router-dom";

export default function OrganizerNavbar() {
  return (
    <nav className="bg-[#0B405B] text-white h-screen w-64 shadow-lg flex flex-col fixed top-0 left-0 p-6 font-sans">
      <h1 className="text-2xl font-bold mb-8 tracking-tight">Organizer Dashboard</h1>
      
      <div className="flex flex-col gap-2 flex-1">
        <Link 
          to="/" 
          className="hover:text-[#94D82A] py-3 px-3 rounded hover:bg-[#0B405B]/50 transition-colors font-medium"
        >
          Home
        </Link>
        <Link 
          to="/search-officials" 
          className="hover:text-[#94D82A] py-3 px-3 rounded hover:bg-[#0B405B]/50 transition-colors font-medium"
        >
          Search Officials
        </Link>
        <Link 
          to="/dashboard" 
          className="hover:text-[#94D82A] py-3 px-3 rounded hover:bg-[#0B405B]/50 transition-colors font-medium"
        >
          OrgDashboard
        </Link>
      </div>
      
      <button className="bg-[#94D82A] text-[#0B405B] px-4 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold tracking-wide mt-auto mb-4">
        Logout
      </button>
    </nav>
  );
}