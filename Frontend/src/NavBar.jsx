import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, LogOut, User, Crown } from "lucide-react";
import Login from "./Login";
import Register from "./Register";
import zemoLogo from "./assets/zemo_logo.jpg";
import { logout, isAuthenticated, getCurrentUser } from "./utils/auth";
import { decodeToken, getRedirectPath } from "./utils/jwt";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (isAuthenticated()) {
          const userData = await getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/Login");
  };

  const handleRegister = () => {
    navigate("/Register");
  };

  const handleHome = () => {
    navigate("/");
  };

  const getDashboardLink = () => {
    if (!user) return null;

    return getRedirectPath(user.role);
  };

  const getDashboardName = () => {
    if (!user) return "";

    switch (user.role) {
      case "official":
        return "Official Dashboard";
      case "organizer":
        return "Organizer Dashboard";
      case "admin":
        return "Admin Panel";
      default:
        return "Dashboard";
    }
  };

  const getRoleIcon = () => {
    if (!user) return null;

    switch (user.role) {
      case "admin":
        return <Crown className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img
                src={zemoLogo}
                alt="Zemo Logo"
                className="h-10 w-auto object-contain"
              />
              <h1 className="text-lg font-bold" style={{ color: "#0B405B" }}>
                GameOfficialsHub
              </h1>
            </div>
            <div className="animate-pulse bg-gray-200 h-8 w-32 rounded"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <img
              src={zemoLogo}
              alt="Zemo Logo"
              className="h-10 w-auto object-contain cursor-pointer"
              onClick={handleHome}
            />
            <h1
              className="text-lg font-bold cursor-pointer"
              style={{ color: "#0B405B" }}
              onClick={handleHome}
            >
              GameOfficialsHub
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-6">
              <button
                onClick={handleHome}
                className="text-gray-900 px-3 py-2 text-sm font-medium transition-colors hover:text-opacity-80"
                style={{ color: "#0B405B" }}
              >
                Home
              </button>

              {user ? (
                <>
                  <button
                    onClick={() => navigate(getDashboardLink())}
                    className="text-gray-600 hover:text-opacity-80 px-3 py-2 text-sm font-medium transition-colors flex items-center space-x-1"
                    style={{ color: "#0B405B" }}
                  >
                    {getRoleIcon()}
                    <span>{getDashboardName()}</span>
                  </button>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">
                      Welcome, {user.name}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="text-gray-600 hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors flex items-center space-x-1"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={handleLogin}
                    className="text-gray-600 hover:text-opacity-80 px-3 py-2 text-sm font-medium transition-colors"
                    style={{ color: "#0B405B" }}
                  >
                    Login
                  </button>
                  <button
                    onClick={handleRegister}
                    className="text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-90"
                    style={{ backgroundColor: "#94D82A" }}
                  >
                    Register
                  </button>
                </>
              )}

              <a
                href="#"
                className="text-gray-600 hover:text-opacity-80 px-3 py-2 text-sm font-medium transition-colors"
                style={{ color: "#0B405B" }}
              >
                About
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
              style={{ color: "#0B405B" }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button
                onClick={handleHome}
                className="block w-full text-left px-3 py-2 text-sm font-medium"
                style={{ color: "#0B405B" }}
              >
                Home
              </button>

              {user ? (
                <>
                  <button
                    onClick={() => {
                      navigate(getDashboardLink());
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm font-medium flex items-center space-x-2"
                    style={{ color: "#0B405B" }}
                  >
                    {getRoleIcon()}
                    <span>{getDashboardName()}</span>
                  </button>
                  <div className="px-3 py-2 text-sm text-gray-600 border-t border-gray-200 mt-2 pt-2">
                    Welcome, {user.name}
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm font-medium text-red-600 flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      handleLogin();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm font-medium"
                    style={{ color: "#0B405B" }}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      handleRegister();
                      setIsMenuOpen(false);
                    }}
                    className="text-white block w-full text-left px-3 py-2 rounded-lg text-sm font-medium"
                    style={{ backgroundColor: "#94D82A" }}
                  >
                    Register
                  </button>
                </>
              )}

              <a
                href="#"
                className="block px-3 py-2 text-sm font-medium"
                style={{ color: "#0B405B" }}
              >
                About
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
