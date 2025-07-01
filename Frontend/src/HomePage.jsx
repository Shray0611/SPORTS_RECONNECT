import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Users,
  Calendar,
  Bell,
  Shield,
  Globe,
} from "lucide-react";
import Navbar from "./NavBar";
export default function GameOfficialsHub() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Section */}
      <section
        className="py-16 sm:py-24"
        style={{
          background: `linear-gradient(135deg, #0B405B 0%, rgba(11, 64, 91, 0.8) 100%)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="mb-12 lg:mb-0">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Connect with Certified Match Officials
                <span style={{ color: "#94D82A" }}> Instantly</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-200 leading-relaxed">
                Book qualified referees, umpires, and scorers across sports in
                seconds.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/OfficalsHomepage")}
                  className="text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg hover:opacity-90"
                  style={{ backgroundColor: "#94D82A" }}
                >
                  Register as Official
                </button>
                <button
                  className="border-2 text-white hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors hover:opacity-90"
                  style={{
                    borderColor: "#94D82A",
                    backgroundColor: "transparent",
                  }}
                  onClick={() => navigate("/dashboard")} // navigate to OrgDashboard
                >
                  Find Officials
                </button>
              </div>
            </div>
            <div className="lg:text-center">
              <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
                <div className="text-6xl mb-4">⚽</div>
                <div className="text-4xl mb-4">🏏</div>
                <div className="text-6xl mb-4">🏀</div>
                <p className="font-medium" style={{ color: "#0B405B" }}>
                  Sports Officials Network
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: "#0B405B" }}
            >
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Simple steps to connect officials with organizers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="text-4xl mb-4">📝</div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "#0B405B" }}
              >
                Register & Set Availability
              </h3>
              <p className="text-gray-600">
                Officials create profiles and set their availability
              </p>
            </div>

            <div className="text-center rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="text-4xl mb-4">🔍</div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "#0B405B" }}
              >
                Organizer Searches by Filters
              </h3>
              <p className="text-gray-600">
                Find officials by sport, location, and availability
              </p>
            </div>

            <div className="text-center rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="text-4xl mb-4">📤</div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "#0B405B" }}
              >
                Sends Booking Request
              </h3>
              <p className="text-gray-600">
                Send instant booking requests with match details
              </p>
            </div>

            <div className="text-center rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="text-4xl mb-4">✅</div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "#0B405B" }}
              >
                Booking Confirmed
              </h3>
              <p className="text-gray-600">
                Officials accept and booking is confirmed instantly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Sports */}
      <section
        className="py-16 sm:py-24"
        style={{ backgroundColor: "rgba(11, 64, 91, 0.05)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: "#0B405B" }}
            >
              Supported Sports
            </h2>
            <p className="text-lg text-gray-600">
              Find certified officials across multiple sports
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div
              className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow border-2 border-transparent hover:border-opacity-30"
              style={{ "--tw-border-opacity": "0.3", borderColor: "#94D82A" }}
            >
              <div className="text-3xl mb-2">🏏</div>
              <p className="font-medium" style={{ color: "#0B405B" }}>
                Cricket
              </p>
            </div>

            <div
              className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow border-2 border-transparent hover:border-opacity-30"
              style={{ "--tw-border-opacity": "0.3", borderColor: "#94D82A" }}
            >
              <div className="text-3xl mb-2">⚽</div>
              <p className="font-medium" style={{ color: "#0B405B" }}>
                Football
              </p>
            </div>

            <div
              className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow border-2 border-transparent hover:border-opacity-30"
              style={{ "--tw-border-opacity": "0.3", borderColor: "#94D82A" }}
            >
              <div className="text-3xl mb-2">🎾</div>
              <p className="font-medium" style={{ color: "#0B405B" }}>
                Tennis
              </p>
            </div>

            <div
              className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow border-2 border-transparent hover:border-opacity-30"
              style={{ "--tw-border-opacity": "0.3", borderColor: "#94D82A" }}
            >
              <div className="text-3xl mb-2">🏸</div>
              <p className="font-medium" style={{ color: "#0B405B" }}>
                Badminton
              </p>
            </div>

            <div
              className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow border-2 border-transparent hover:border-opacity-30"
              style={{ "--tw-border-opacity": "0.3", borderColor: "#94D82A" }}
            >
              <div className="text-3xl mb-2">🏐</div>
              <p className="font-medium" style={{ color: "#0B405B" }}>
                Volleyball
              </p>
            </div>

            <div
              className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow border-2 border-transparent hover:border-opacity-30"
              style={{ "--tw-border-opacity": "0.3", borderColor: "#94D82A" }}
            >
              <div className="text-3xl mb-2">🏀</div>
              <p className="font-medium" style={{ color: "#0B405B" }}>
                Basketball
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* User Roles Overview */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: "#0B405B" }}
            >
              User Roles Overview
            </h2>
            <p className="text-lg text-gray-600">
              Two distinct experiences tailored for different users
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div
              className="rounded-2xl p-8"
              style={{ backgroundColor: "rgba(148, 216, 42, 0.1)" }}
            >
              <div className="text-center mb-6">
                <Users
                  className="mx-auto h-12 w-12 mb-4"
                  style={{ color: "#0B405B" }}
                />
                <h3 className="text-2xl font-bold" style={{ color: "#0B405B" }}>
                  Officials
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle
                    className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0"
                    style={{ color: "#94D82A" }}
                  />
                  <span className="text-gray-700">
                    Manage availability calendar
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0"
                    style={{ color: "#94D82A" }}
                  />
                  <span className="text-gray-700">
                    Receive booking requests
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0"
                    style={{ color: "#94D82A" }}
                  />
                  <span className="text-gray-700">Track match history</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0"
                    style={{ color: "#94D82A" }}
                  />
                  <span className="text-gray-700">Earn from officiating</span>
                </li>
              </ul>
            </div>

            <div
              className="rounded-2xl p-8"
              style={{ backgroundColor: "rgba(148, 216, 42, 0.1)" }}
            >
              <div className="text-center mb-6">
                <Calendar
                  className="mx-auto h-12 w-12 mb-4"
                  style={{ color: "#94D82A" }}
                />
                <h3 className="text-2xl font-bold" style={{ color: "#0B405B" }}>
                  Organizers
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle
                    className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0"
                    style={{ color: "#0B405B" }}
                  />
                  <span className="text-gray-700">
                    Search by sport and location
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0"
                    style={{ color: "#0B405B" }}
                  />
                  <span className="text-gray-700">
                    View official profiles and ratings
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0"
                    style={{ color: "#0B405B" }}
                  />
                  <span className="text-gray-700">
                    Send instant booking requests
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0"
                    style={{ color: "#0B405B" }}
                  />
                  <span className="text-gray-700">
                    Manage tournament schedules
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section
        className="py-16 sm:py-24 text-white"
        style={{ backgroundColor: "#0B405B" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why GameOfficialsHub?
            </h2>
            <p className="text-lg text-gray-300">
              The most trusted platform for sports officiating
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield
                className="mx-auto h-12 w-12 mb-4"
                style={{ color: "#94D82A" }}
              />
              <h3 className="text-xl font-semibold mb-2">
                Certified Officials Only
              </h3>
              <p className="text-gray-300">
                All officials are verified and certified professionals
              </p>
            </div>

            <div className="text-center">
              <Globe
                className="mx-auto h-12 w-12 mb-4"
                style={{ color: "#94D82A" }}
              />
              <h3 className="text-xl font-semibold mb-2">Live Availability</h3>
              <p className="text-gray-300">
                Real-time availability tracking and instant updates
              </p>
            </div>

            <div className="text-center">
              <Bell
                className="mx-auto h-12 w-12 mb-4"
                style={{ color: "#94D82A" }}
              />
              <h3 className="text-xl font-semibold mb-2">
                Real-Time Notifications
              </h3>
              <p className="text-gray-300">
                Instant notifications for booking requests and updates
              </p>
            </div>

            <div className="text-center">
              <CheckCircle
                className="mx-auto h-12 w-12 mb-4"
                style={{ color: "#94D82A" }}
              />
              <h3 className="text-xl font-semibold mb-2">
                Admin Verified Profiles
              </h3>
              <p className="text-gray-300">
                Every profile is manually verified by our admin team
              </p>
            </div>

            <div className="text-center">
              <Users
                className="mx-auto h-12 w-12 mb-4"
                style={{ color: "#94D82A" }}
              />
              <h3 className="text-xl font-semibold mb-2">
                Multi-Sport Support
              </h3>
              <p className="text-gray-300">
                Support for multiple sports with specialized officials
              </p>
            </div>

            <div className="text-center">
              <Calendar
                className="mx-auto h-12 w-12 mb-4"
                style={{ color: "#94D82A" }}
              />
              <h3 className="text-xl font-semibold mb-2">Easy Scheduling</h3>
              <p className="text-gray-300">
                Simplified booking process with calendar integration
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call-to-Action */}
      <section
        className="py-16 sm:py-24"
        style={{ backgroundColor: "#94D82A" }}
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-6"
            style={{ color: "#0B405B" }}
          >
            Ready to join the network?
          </h2>
          <p className="text-xl mb-8" style={{ color: "#0B405B" }}>
            Join thousands of officials and organizers already using
            GameOfficialsHub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="bg-white hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg"
              style={{ color: "#0B405B" }}
            >
              Get Started as Official
            </button>
            <button
              className="border-2 text-white hover:bg-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              style={{
                borderColor: "#0B405B",
                color: "#0B405B",
                backgroundColor: "transparent",
              }}
            >
              Search Officials Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="text-gray-300 py-12"
        style={{ backgroundColor: "#0B405B" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left - Logo and Description */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                GameOfficialsHub
              </h3>
              <p className="text-gray-300 leading-relaxed">
                The premier platform connecting certified sports officials with
                organizers across multiple sports.
              </p>
            </div>

            {/* Center - Navigation Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                    style={{ color: "#94D82A" }}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                    style={{ color: "#94D82A" }}
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                    style={{ color: "#94D82A" }}
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                    style={{ color: "#94D82A" }}
                  >
                    Sports
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                    style={{ color: "#94D82A" }}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Right - Social Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                  style={{ color: "#94D82A" }}
                >
                  <span className="sr-only">LinkedIn</span>
                  📧
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                  style={{ color: "#94D82A" }}
                >
                  <span className="sr-only">GitHub</span>
                  🔗
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                  style={{ color: "#94D82A" }}
                >
                  <span className="sr-only">Twitter</span>
                  📱
                </a>
              </div>
            </div>
          </div>

          <div
            className="border-t mt-8 pt-8 text-center text-gray-400"
            style={{ borderColor: "rgba(148, 216, 42, 0.3)" }}
          >
            <p>&copy; 2025 GameOfficialsHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
