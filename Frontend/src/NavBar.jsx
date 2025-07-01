import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Login from "./Login";
import Register from "./Register";
import zemoLogo from "./assets/zemo_logo.jpg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <img
              src={zemoLogo}
              alt="Zemo Logo"
              className="h-10 w-auto object-contain" // Adjusted height and responsiveness
            />
            <h1 className="text-lg font-bold" style={{ color: "#0B405B" }}>
              GameOfficialsHub
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-6">
              <a
                href="#"
                className="text-gray-900 px-3 py-2 text-sm font-medium transition-colors hover:text-opacity-80"
                style={{ color: "#0B405B" }}
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-opacity-80 px-3 py-2 text-sm font-medium transition-colors"
                style={{ color: "#0B405B" }}
              >
                Login
              </a>
              <a
                href="#"
                className="text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-90"
                style={{ backgroundColor: "#94D82A" }}
              >
                Register
              </a>
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
              <a
                href="#"
                className="block px-3 py-2 text-sm font-medium"
                style={{ color: "#0B405B" }}
              >
                Home
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-sm font-medium"
                style={{ color: "#0B405B" }}
              >
                Login
              </a>
              <a
                href="#"
                className="text-white block px-3 py-2 rounded-lg text-sm font-medium"
                style={{ backgroundColor: "#94D82A" }}
              >
                Register
              </a>
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
