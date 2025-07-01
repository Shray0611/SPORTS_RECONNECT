import React, { useState } from 'react';
import { Menu, X, CheckCircle, Users, Calendar, Bell, Shield, Globe } from 'lucide-react';

export default function GameOfficialsHub() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-blue-600">GameOfficialsHub</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Home</a>
                <a href="#" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Login</a>
                <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">Register</a>
                <a href="#" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">About</a>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                <a href="#" className="text-gray-900 hover:text-blue-600 block px-3 py-2 text-sm font-medium">Home</a>
                <a href="#" className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-sm font-medium">Login</a>
                <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white block px-3 py-2 rounded-lg text-sm font-medium">Register</a>
                <a href="#" className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-sm font-medium">About</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="mb-12 lg:mb-0">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Connect with Certified Match Officials 
                <span className="text-blue-600"> Instantly</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed">
                Book qualified referees, umpires, and scorers across sports in seconds.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg">
                  Register as Official
                </button>
                <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                  Find Officials
                </button>
              </div>
            </div>
            <div className="lg:text-center">
              <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
                <div className="text-6xl mb-4">⚽</div>
                <div className="text-4xl mb-4">🏏</div>
                <div className="text-6xl mb-4">🏀</div>
                <p className="text-gray-600 font-medium">Sports Officials Network</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Simple steps to connect officials with organizers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Register & Set Availability</h3>
              <p className="text-gray-600">Officials create profiles and set their availability</p>
            </div>
            
            <div className="text-center bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Organizer Searches by Filters</h3>
              <p className="text-gray-600">Find officials by sport, location, and availability</p>
            </div>
            
            <div className="text-center bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">📤</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sends Booking Request</h3>
              <p className="text-gray-600">Send instant booking requests with match details</p>
            </div>
            
            <div className="text-center bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Booking Confirmed</h3>
              <p className="text-gray-600">Officials accept and booking is confirmed instantly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Sports */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Supported Sports</h2>
            <p className="text-lg text-gray-600">Find certified officials across multiple sports</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">🏏</div>
              <p className="font-medium text-gray-900">Cricket</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">⚽</div>
              <p className="font-medium text-gray-900">Football</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">🎾</div>
              <p className="font-medium text-gray-900">Tennis</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">🏸</div>
              <p className="font-medium text-gray-900">Badminton</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">🏐</div>
              <p className="font-medium text-gray-900">Volleyball</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">🏀</div>
              <p className="font-medium text-gray-900">Basketball</p>
            </div>
          </div>
        </div>
      </section>

      {/* User Roles Overview */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">User Roles Overview</h2>
            <p className="text-lg text-gray-600">Two distinct experiences tailored for different users</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-2xl p-8">
              <div className="text-center mb-6">
                <Users className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900">Officials</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Manage availability calendar</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Receive booking requests</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Track match history</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Earn from officiating</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-green-50 rounded-2xl p-8">
              <div className="text-center mb-6">
                <Calendar className="mx-auto h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900">Organizers</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Search by sport and location</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">View official profiles and ratings</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Send instant booking requests</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Manage tournament schedules</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 sm:py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why GameOfficialsHub?</h2>
            <p className="text-lg text-gray-300">The most trusted platform for sports officiating</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="mx-auto h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Certified Officials Only</h3>
              <p className="text-gray-300">All officials are verified and certified professionals</p>
            </div>
            
            <div className="text-center">
              <Globe className="mx-auto h-12 w-12 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Live Availability</h3>
              <p className="text-gray-300">Real-time availability tracking and instant updates</p>
            </div>
            
            <div className="text-center">
              <Bell className="mx-auto h-12 w-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-Time Notifications</h3>
              <p className="text-gray-300">Instant notifications for booking requests and updates</p>
            </div>
            
            <div className="text-center">
              <CheckCircle className="mx-auto h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Admin Verified Profiles</h3>
              <p className="text-gray-300">Every profile is manually verified by our admin team</p>
            </div>
            
            <div className="text-center">
              <Users className="mx-auto h-12 w-12 text-red-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Multi-Sport Support</h3>
              <p className="text-gray-300">Support for multiple sports with specialized officials</p>
            </div>
            
            <div className="text-center">
              <Calendar className="mx-auto h-12 w-12 text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Scheduling</h3>
              <p className="text-gray-300">Simplified booking process with calendar integration</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call-to-Action */}
      <section className="py-16 sm:py-24 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to join the network?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of officials and organizers already using GameOfficialsHub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg">
              Get Started as Official
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              Search Officials Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left - Logo and Description */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">GameOfficialsHub</h3>
              <p className="text-gray-400 leading-relaxed">
                The premier platform connecting certified sports officials with organizers across multiple sports.
              </p>
            </div>
            
            {/* Center - Navigation Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sports</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            {/* Right - Social Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  📧
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">GitHub</span>
                  🔗
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  📱
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 GameOfficialsHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}