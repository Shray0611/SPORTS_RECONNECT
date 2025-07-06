import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Users,
  Calendar,
} from "lucide-react";
import Navbar from "./NavBar";
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("official");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    console.log("Login attempt:", { email, password, userType });
  };

  return (
    <div className="min-h-screen flex">
      
      {/* Left Side - Branding */}
      <div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #0B405B 0%, rgba(11, 64, 91, 0.9) 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
          <div className="text-center mb-8">
            <div className="text-6xl mb-6">⚽🏏🏀</div>
            <h1 className="text-4xl font-bold mb-4">GameOfficialsHub</h1>
            <p className="text-xl text-gray-200 mb-8">
              Connect with Certified Match Officials Instantly
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 max-w-md">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20">
              <div className="flex items-center mb-3">
                <Users className="h-6 w-6 mr-3" style={{ color: "#94D82A" }} />
                <h3 className="font-semibold">For Officials</h3>
              </div>
              <p className="text-sm text-gray-200">
                Manage your availability and receive booking requests
              </p>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20">
              <div className="flex items-center mb-3">
                <Calendar
                  className="h-6 w-6 mr-3"
                  style={{ color: "#94D82A" }}
                />
                <h3 className="font-semibold">For Organizers</h3>
              </div>
              <p className="text-sm text-gray-200">
                Find and book certified officials for your events
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white bg-opacity-10 rounded-full blur-xl"></div>
        <div
          className="absolute bottom-10 right-10 w-40 h-40 bg-opacity-10 rounded-full blur-xl"
          style={{ backgroundColor: "#94D82A" }}
        ></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2
                className="text-3xl font-bold mb-2"
                style={{ color: "#0B405B" }}
              >
                Welcome Back
              </h2>
              <p className="text-gray-600">Sign in to your account</p>
            </div>

            {/* User Type Selection */}
            <div className="mb-6">
              <div
                className="flex rounded-lg p-1"
                style={{ backgroundColor: "rgba(11, 64, 91, 0.1)" }}
              >
                <button
                  type="button"
                  onClick={() => setUserType("official")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                    userType === "official"
                      ? "bg-white text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  style={
                    userType === "official"
                      ? { backgroundColor: "#0B405B" }
                      : {}
                  }
                >
                  <Users className="h-4 w-4 inline mr-2" />
                  Official
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("organizer")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                    userType === "organizer"
                      ? "bg-white text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  style={
                    userType === "organizer"
                      ? { backgroundColor: "#0B405B" }
                      : {}
                  }
                >
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Organizer
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                    style={{ focusRingColor: "#94D82A" }}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                    style={{ focusRingColor: "#94D82A" }}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium hover:underline"
                  style={{ color: "#94D82A" }}
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-semibold transition-all duration-200 hover:opacity-90 transform hover:scale-105 shadow-lg"
                style={{ backgroundColor: "#94D82A" }}
              >
                Sign In
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>

            {/* Divider */}
            <div className="mt-8 mb-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    New to GameOfficialsHub?
                  </span>
                </div>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <button
                type="button"
                className="w-full py-3 px-4 border-2 rounded-lg font-semibold transition-all duration-200 hover:bg-gray-50"
                style={{ borderColor: "#0B405B", color: "#0B405B" }}
              >
                Create Account
              </button>
            </div>
          </div>

          {/* Mobile Logo */}
          <div className="lg:hidden text-center mt-8">
            <div className="text-3xl mb-2">⚽🏏🏀</div>
            <h3 className="text-lg font-semibold" style={{ color: "#0B405B" }}>
              GameOfficialsHub
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
