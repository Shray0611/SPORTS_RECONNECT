import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  Calendar,
  Users,
  ArrowRight,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import apiService from "../services/api";
import { decodeToken, getRedirectPath } from "../utils/jwt";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState("official");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    location: "",
    sports: [],
    experience: "",
    organization: "",
    certifications: [],
    dateOfBirth: "",
    dateOfEstablishment: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSportsChange = (sport) => {
    setFormData((prev) => ({
      ...prev,
      sports: prev.sports.includes(sport)
        ? prev.sports.filter((s) => s !== sport)
        : [...prev.sports, sport],
    }));
  };

  const validateForm = () => {
    // Basic validation
    if (!formData.firstName || !formData.lastName) {
      setError("First name and last name are required");
      return false;
    }

    if (!formData.email) {
      setError("Email is required");
      return false;
    }

    if (!formData.password) {
      setError("Password is required");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (!formData.location) {
      setError("Location is required");
      return false;
    }

    if (formData.sports.length === 0) {
      setError("Please select at least one sport");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // Prepare user data for API
      const userData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        role: userType,
        phone: formData.phone,
        location: formData.location,
        sports: formData.sports,
        experience: formData.experience,
        organization: formData.organization,
        certifications: formData.certifications,
        ...(userType === "official" && formData.dateOfBirth
          ? { dateOfBirth: formData.dateOfBirth }
          : {}),
        ...(userType === "organizer" && formData.dateOfEstablishment
          ? { dateOfEstablishment: formData.dateOfEstablishment }
          : {}),
      };

      const response = await apiService.register(userData);

      // Store token and user info
      apiService.setToken(response.token);

      setSuccess("Account created successfully! Redirecting...");

      // Decode JWT to get user role
      const decodedToken = decodeToken(response.token);

      if (!decodedToken || !decodedToken.role) {
        throw new Error("Invalid token received");
      }

      // Get redirect path based on role
      const redirectPath = getRedirectPath(decodedToken.role);

      // Redirect to appropriate dashboard after a short delay
      setTimeout(() => {
        navigate(redirectPath);
      }, 2000);
    } catch (error) {
      setError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const sportsOptions = [
    "Cricket",
    "Football",
    "Tennis",
    "Badminton",
    "Volleyball",
    "Basketball",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-2xl w-full my-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="text-3xl mb-4">⚽🏏🏀</div>
            <h2
              className="text-3xl font-bold mb-2"
              style={{ color: "#0B405B" }}
            >
              Create Account
            </h2>
            <p className="text-gray-600">Join the GameOfficialsHub community</p>
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
                className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  userType === "official"
                    ? "bg-white text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
                style={
                  userType === "official" ? { backgroundColor: "#0B405B" } : {}
                }
              >
                <Users className="h-4 w-4 inline mr-2" />
                Register as Official
              </button>
              <button
                type="button"
                onClick={() => setUserType("organizer")}
                className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  userType === "organizer"
                    ? "bg-white text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
                style={
                  userType === "organizer" ? { backgroundColor: "#0B405B" } : {}
                }
              >
                <Calendar className="h-4 w-4 inline mr-2" />
                Register as Organizer
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-green-700 text-sm">{success}</span>
            </div>
          )}

          <div className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                    placeholder="First name"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                    placeholder="Last name"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                    placeholder="Enter phone number"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your city/location"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Date of Birth for Officials / Date of Establishment for Organizers */}
            {userType === "official" ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    handleInputChange("dateOfBirth", e.target.value)
                  }
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                  placeholder="YYYY-MM-DD"
                  disabled={isLoading}
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Establishment *
                </label>
                <input
                  type="date"
                  required
                  value={formData.dateOfEstablishment}
                  onChange={(e) =>
                    handleInputChange("dateOfEstablishment", e.target.value)
                  }
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                  placeholder="YYYY-MM-DD"
                  disabled={isLoading}
                />
              </div>
            )}

            {/* Sports Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {userType === "official"
                  ? "Sports You Officiate *"
                  : "Sports You Organize *"}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {sportsOptions.map((sport) => (
                  <button
                    key={sport}
                    type="button"
                    onClick={() => handleSportsChange(sport)}
                    disabled={isLoading}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                      formData.sports.includes(sport)
                        ? "border-transparent text-white"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                    style={
                      formData.sports.includes(sport)
                        ? { backgroundColor: "#94D82A" }
                        : {}
                    }
                  >
                    {sport}
                  </button>
                ))}
              </div>
            </div>

            {/* Conditional Fields */}
            {userType === "official" ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Years of Experience
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) =>
                    handleInputChange("experience", e.target.value)
                  }
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                  disabled={isLoading}
                >
                  <option value="">Select experience level</option>
                  <option value="1-2">1-2 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="6-10">6-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organization/Club Name
                </label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) =>
                    handleInputChange("organization", e.target.value)
                  }
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                  placeholder="Enter organization name"
                  disabled={isLoading}
                />
              </div>
            )}

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                    placeholder="Create password (min 6 chars)"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                    placeholder="Confirm password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                required
                className="h-4 w-4 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                disabled={isLoading}
              />
              <label
                htmlFor="terms"
                className="ml-3 block text-sm text-gray-700"
              >
                I agree to the{" "}
                <a
                  href="#"
                  className="font-medium hover:underline"
                  style={{ color: "#94D82A" }}
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="font-medium hover:underline"
                  style={{ color: "#94D82A" }}
                >
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full flex items-center justify-center py-4 px-4 rounded-lg text-white font-semibold transition-all duration-200 hover:opacity-90 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#94D82A" }}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
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
                  Already have an account?
                </span>
              </div>
            </div>
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate("/Login")}
              className="w-full py-3 px-4 border-2 rounded-lg font-semibold transition-all duration-200 hover:bg-gray-50"
              style={{ borderColor: "#0B405B", color: "#0B405B" }}
            >
              Sign In Instead
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
