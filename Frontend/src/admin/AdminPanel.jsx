import React, { useEffect, useState } from "react";
import apiService from "../services/api";
import { useNavigate, Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import Dashboard from "./Dashboard";
import RegisteredOfficials from "./RegisteredOfficials";
import ApproveDeclineProfiles from "./ApproveDeclineProfiles";
import ManualBookingManagement from "./ManualBookingManagement";

const AdminPanel = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    apiService.logout();
    navigate("/");
  };
  useEffect(() => {
    const handlePopState = () => {
      apiService.logout();
      window.location.href = "/";
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminNavbar onLogout={handleLogout} />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
