"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  ChevronDown,
  Users,
  Calendar,
  Trophy,
  Star,
  ArrowRight,
  Play,
  Sun,
  Moon,
  Menu,
  X,
  Quote,
  MapPin,
  Clock,
  Shield,
  Award,
  Phone,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function HomePage() {
  const heroRef = useRef(null)
  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [cursorText, setCursorText] = useState("")
  const [cursorVariant, setCursorVariant] = useState("default")
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    initCursor()
    initAnimations()
  }, [])

  const initCursor = () => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current

    if (!cursor || !cursorDot) return

    const moveCursor = (e) => {
      const { clientX: x, clientY: y } = e

      if (cursor) {
        cursor.style.left = x + "px"
        cursor.style.top = y + "px"
      }

      if (cursorDot) {
        cursorDot.style.left = x + "px"
        cursorDot.style.top = y + "px"
      }
    }

    const handleMouseEnter = (e) => {
      const target = e.target
      if (!(target instanceof Element)) {
        return
      }

      if (target.matches("button, a, .cursor-pointer")) {
        setCursorVariant("hover")
        if (target.dataset.cursorText) {
          setCursorText(target.dataset.cursorText || "")
        }
      } else if (target.matches("img")) {
        setCursorVariant("image")
        setCursorText("VIEW")
      } else if (target.matches(".service-card")) {
        setCursorVariant("explore")
        setCursorText("EXPLORE")
      }
    }

    const handleMouseLeave = () => {
      setCursorVariant("default")
      setCursorText("")
    }

    document.addEventListener("mousemove", moveCursor)
    document.addEventListener("mouseenter", handleMouseEnter, true)
    document.addEventListener("mouseleave", handleMouseLeave, true)

    return () => {
      document.removeEventListener("mousemove", moveCursor)
      document.removeEventListener("mouseenter", handleMouseEnter, true)
      document.removeEventListener("mouseleave", handleMouseLeave, true)
    }
  }

  const initAnimations = () => {
    const heroElements = document.querySelectorAll(".hero-title, .hero-subtitle, .hero-cta")
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        if (el instanceof HTMLElement) {
          el.style.opacity = "1"
          el.style.transform = "translateY(0)"
        }
      }, index * 200)
    })
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const services = [
    {
      number: "01",
      title: "Official Matching",
      description:
        "Connect with certified sports officials for your games and tournaments. Our AI-powered matching ensures the perfect fit for your sport and level.",
      image: "/placeholder.svg?height=400&width=600",
      icon: <Users size={24} />,
    },
    {
      number: "02",
      title: "Instant Booking",
      description:
        "Book qualified referees and umpires instantly with our streamlined platform. Real-time availability and automated scheduling make it effortless.",
      image: "/placeholder.svg?height=400&width=600",
      icon: <Calendar size={24} />,
    },
    {
      number: "03",
      title: "Quality Assurance",
      description:
        "All officials are vetted, certified, and rated by the community. Comprehensive profiles and performance tracking ensure top-quality officiating.",
      image: "/placeholder.svg?height=400&width=600",
      icon: <Shield size={24} />,
    },
    {
      number: "04",
      title: "Event Management",
      description:
        "Complete tournament and league management tools. From scheduling to payments, we handle the logistics so you can focus on the game.",
      image: "/placeholder.svg?height=400&width=600",
      icon: <Trophy size={24} />,
    },
  ]

  const features = [
    {
      icon: <Clock size={20} />,
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your officiating needs",
    },
    {
      icon: <Shield size={20} />,
      title: "Verified Officials",
      description: "All officials undergo thorough background checks and certification",
    },
    {
      icon: <Award size={20} />,
      title: "Performance Tracking",
      description: "Detailed analytics and performance metrics for continuous improvement",
    },
    {
      icon: <MapPin size={20} />,
      title: "Location Based",
      description: "Find officials in your area with our smart location matching",
    },
  ]

  const reviews = [
    {
      name: "Sarah Martinez",
      role: "League Director",
      organization: "Metro Youth Soccer",
      rating: 5,
      text: "SportsRef has revolutionized how we manage our officiating. The quality of referees and ease of booking is unmatched.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Michael Chen",
      role: "Tournament Director",
      organization: "Basketball Central",
      rating: 5,
      text: "Outstanding platform! The officials are professional, punctual, and truly understand the game. Highly recommended.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Jennifer Wilson",
      role: "Athletic Director",
      organization: "City High School",
      rating: 5,
      text: "The booking process is seamless and the officials are top-notch. Our games run smoother than ever before.",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  const themeClasses = isDarkMode ? "min-h-screen bg-black text-white" : "min-h-screen bg-gray-50 text-gray-900"

  const navBgClasses = isDarkMode
    ? "bg-black/80 backdrop-blur-md border-b border-gray-800"
    : "bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm"

  const cardBgClasses = isDarkMode
    ? "bg-gray-900/50 border border-gray-800"
    : "bg-white border border-gray-200 shadow-lg"

  return (
    <div className={`${themeClasses} overflow-x-hidden cursor-none`}>
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-50 mix-blend-difference transition-all duration-300 ease-out ${
          cursorVariant === "hover"
            ? "w-20 h-20"
            : cursorVariant === "image"
              ? "w-24 h-24"
              : cursorVariant === "explore"
                ? "w-28 h-28"
                : "w-12 h-12"
        }`}
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div
          className={`w-full h-full rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            cursorVariant === "hover"
              ? "bg-green-500/20 border-green-400"
              : cursorVariant === "image"
                ? "bg-green-600/20 border-green-500"
                : cursorVariant === "explore"
                  ? "bg-green-700/20 border-green-600"
                  : isDarkMode
                    ? "bg-white/10 border-white"
                    : "bg-black/10 border-black"
          }`}
        >
          {cursorText && (
            <span className={`text-xs font-bold opacity-80 ${isDarkMode ? "text-white" : "text-black"}`}>
              {cursorText}
            </span>
          )}
        </div>
      </div>

      {/* Cursor Dot */}
      <div
        ref={cursorDotRef}
        className={`fixed pointer-events-none z-40 w-1 h-1 rounded-full transition-all duration-100 ${
          isDarkMode ? "bg-white" : "bg-black"
        }`}
        style={{ transform: "translate(-50%, -50%)" }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 ${navBgClasses}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold cursor-pointer">
            <span className={isDarkMode ? "text-white" : "text-black"}>SPORTS</span>
            <span className="text-green-500">REF®</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <a
              href="#services"
              className={`hover:text-green-400 transition-colors cursor-pointer ${isDarkMode ? "text-white" : "text-gray-700"}`}
            >
              Services
            </a>
            <a
              href="#features"
              className={`hover:text-green-400 transition-colors cursor-pointer ${isDarkMode ? "text-white" : "text-gray-700"}`}
            >
              Features
            </a>
            <a
              href="#reviews"
              className={`hover:text-green-400 transition-colors cursor-pointer ${isDarkMode ? "text-white" : "text-gray-700"}`}
            >
              Reviews
            </a>
            <a
              href="#about"
              className={`hover:text-green-400 transition-colors cursor-pointer ${isDarkMode ? "text-white" : "text-gray-700"}`}
            >
              About
            </a>
            <a
              href="#contact"
              className={`hover:text-green-400 transition-colors cursor-pointer ${isDarkMode ? "text-white" : "text-gray-700"}`}
            >
              Contact
            </a>
          </div>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="icon"
              className={`rounded-full transition-colors hover:bg-green-500/20 ${isDarkMode ? "text-white" : "text-gray-700"}`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>

            {/* Login Button */}
            <Link href="/signin">
              <Button
                variant="outline"
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  isDarkMode
                    ? "border-gray-600 hover:border-green-400 hover:bg-green-400/10 text-white bg-transparent"
                    : "border-gray-300 hover:border-green-500 hover:bg-green-50 text-gray-700 bg-white"
                }`}
                data-cursor-text="LOGIN"
              >
                Sign In
              </Button>
            </Link>

            {/* Get Started Button */}
            <Button
              className={`rounded-full transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                isDarkMode ? "bg-green-600 hover:bg-green-700 text-white" : "bg-green-500 hover:bg-green-600 text-white"
              }`}
              data-cursor-text="JOIN"
            >
              Get Started
            </Button>

            {/* Mobile Menu Button */}
            <Button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              variant="ghost"
              size="icon"
              className={`md:hidden ${isDarkMode ? "text-white" : "text-gray-700"}`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden ${isDarkMode ? "bg-black border-gray-800" : "bg-white border-gray-200"} border-t`}>
            <div className="px-6 py-4 space-y-4">
              <a
                href="#services"
                className={`block hover:text-green-400 transition-colors ${isDarkMode ? "text-white" : "text-gray-700"}`}
              >
                Services
              </a>
              <a
                href="#features"
                className={`block hover:text-green-400 transition-colors ${isDarkMode ? "text-white" : "text-gray-700"}`}
              >
                Features
              </a>
              <a
                href="#reviews"
                className={`block hover:text-green-400 transition-colors ${isDarkMode ? "text-white" : "text-gray-700"}`}
              >
                Reviews
              </a>
              <a
                href="#about"
                className={`block hover:text-green-400 transition-colors ${isDarkMode ? "text-white" : "text-gray-700"}`}
              >
                About
              </a>
              <a
                href="#contact"
                className={`block hover:text-green-400 transition-colors ${isDarkMode ? "text-white" : "text-gray-700"}`}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className={`absolute inset-0 ${isDarkMode ? "bg-gradient-to-br from-green-900/20 via-black to-gray-900/20" : "bg-gradient-to-br from-green-50 via-white to-gray-50"}`}
        ></div>
        <div className="absolute inset-0 opacity-10">
          <div
            className={`absolute top-20 left-20 w-96 h-96 bg-green-500 rounded-full blur-3xl ${isDarkMode ? "opacity-20" : "opacity-10"}`}
          ></div>
          <div
            className={`absolute bottom-20 right-20 w-80 h-80 bg-green-600 rounded-full blur-3xl ${isDarkMode ? "opacity-15" : "opacity-8"}`}
          ></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="mb-6">
            <span className="text-green-500 text-sm font-semibold tracking-wider uppercase">
              Sports Official Booking Platform
            </span>
          </div>
          <h1 className="hero-title text-6xl md:text-8xl font-bold mb-6 leading-tight opacity-0 transform translate-y-12 transition-all duration-1000">
            Elite Sports
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
              Officiating Platform
            </span>
          </h1>
          <p
            className={`hero-subtitle text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-0 transform translate-y-8 transition-all duration-1000 delay-300 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Connect with certified sports officials instantly. Premium quality, community verified, professionally
            managed.
          </p>
          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 transform translate-y-6 transition-all duration-1000 delay-500">
            <Button
              size="lg"
              className={`rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 cursor-pointer ${
                isDarkMode
                  ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                  : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
              }`}
              data-cursor-text="BOOK"
            >
              <Play size={20} />
              Book an Official
            </Button>
            <Button
              variant="outline"
              size="lg"
              className={`rounded-full text-lg font-semibold transition-all duration-300 cursor-pointer ${
                isDarkMode
                  ? "border-gray-600 hover:border-green-400 hover:bg-green-400/10 text-white bg-transparent"
                  : "border-gray-300 hover:border-green-500 hover:bg-green-50 text-gray-700 bg-white"
              }`}
              data-cursor-text="JOIN"
            >
              Join as Official
            </Button>
          </div>
        </div>

        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 ${isDarkMode ? "bg-gray-900/50" : "bg-green-50"}`} id="features">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-green-500 text-sm font-semibold tracking-wider uppercase mb-4 block">
              Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Built for Excellence</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl transition-all duration-300 hover:scale-105 ${cardBgClasses}`}
              >
                <div className="text-green-500 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 relative" id="services">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-green-500 text-sm font-semibold tracking-wider uppercase mb-4 block">
              Our Services
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Everything you need
              <br />
              <span className="text-green-500">in one platform</span>
            </h2>
          </div>

          <div className="space-y-32">
            {services.map((service, index) => (
              <div
                key={index}
                className={`service-card flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-16 cursor-pointer`}
              >
                <div className="flex-1">
                  <div className={`text-6xl font-bold mb-4 ${isDarkMode ? "text-gray-800" : "text-gray-200"}`}>
                    {service.number}
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-green-500">{service.icon}</div>
                    <h3 className="text-4xl font-bold">{service.title}</h3>
                  </div>
                  <p className={`text-xl mb-8 leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {service.description}
                  </p>
                  <Button
                    variant="ghost"
                    className={`group flex items-center gap-2 transition-colors cursor-pointer p-0 h-auto ${
                      isDarkMode
                        ? "text-green-400 hover:text-green-300 hover:bg-transparent"
                        : "text-green-600 hover:text-green-500 hover:bg-transparent"
                    }`}
                    data-cursor-text="READ"
                  >
                    Learn More
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <div className="flex-1">
                  <div className="relative group">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      className="w-full h-96 object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className={`py-32 ${isDarkMode ? "bg-gray-900/30" : "bg-white"}`} id="reviews">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-green-500 text-sm font-semibold tracking-wider uppercase mb-4 block">
              Client Reviews
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">What Our Clients Say</h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              {
                "Don't just take our word for it. Here's what sports organizations across the country are saying about SportsRef."
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl transition-all duration-300 hover:scale-105 ${cardBgClasses}`}
              >
                <div className="flex items-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="text-green-500 mb-4" size={24} />
                <p className={`mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>"{review.text}"</p>
                <div className="flex items-center">
                  <img
                    src={review.image || "/placeholder.svg"}
                    alt={review.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <div className="font-semibold">{review.name}</div>
                    <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {review.role} at {review.organization}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        className={`py-32 ${isDarkMode ? "bg-gradient-to-r from-gray-900 to-black" : "bg-gradient-to-r from-green-50 to-gray-50"}`}
        id="contact"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-green-500 text-sm font-semibold tracking-wider uppercase mb-4 block">
              Get In Touch
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Ready to get started? Have questions? {"We're here to help you every step of the way."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-bold mb-8">{"Let's Talk"}</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <Phone className="text-green-500 mr-4" size={20} />
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className={isDarkMode ? "text-gray-300" : "text-gray-600"}>+1 (555) 123-4567</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="text-green-500 mr-4" size={20} />
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className={isDarkMode ? "text-gray-300" : "text-gray-600"}>hello@sportsref.com</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-green-500 mr-4" size={20} />
                  <div>
                    <div className="font-semibold">Office</div>
                    <div className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                      123 Sports Avenue, Athletic City, AC 12345
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-8 rounded-2xl ${cardBgClasses}`}>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    placeholder="First Name"
                    className={`${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    }`}
                  />
                  <Input
                    type="text"
                    placeholder="Last Name"
                    className={`${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    }`}
                  />
                </div>
                <Input
                  type="email"
                  placeholder="Email Address"
                  className={`${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                />
                <Textarea
                  placeholder="Your Message"
                  rows={5}
                  className={`resize-none ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                />
                <Button
                  type="submit"
                  className={`w-full font-semibold transition-all duration-300 cursor-pointer ${
                    isDarkMode
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                  data-cursor-text="SEND"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-16 ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="text-2xl font-bold mb-4">
                <span className={isDarkMode ? "text-white" : "text-black"}>SPORTS</span>
                <span className="text-green-500">REF®</span>
              </div>
              <p className={`mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Connecting sports with certified officials worldwide.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Platform</h4>
              <ul className={`space-y-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                <li>
                  <a href="#" className={`transition-colors ${isDarkMode ? "hover:text-white" : "hover:text-black"}`}>
                    Book Officials
                  </a>
                </li>
                <li>
                  <a href="#" className={`transition-colors ${isDarkMode ? "hover:text-white" : "hover:text-black"}`}>
                    Join as Official
                  </a>
                </li>
                <li>
                  <a href="#" className={`transition-colors ${isDarkMode ? "hover:text-white" : "hover:text-black"}`}>
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className={`transition-colors ${isDarkMode ? "hover:text-white" : "hover:text-black"}`}>
                    Features
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className={`space-y-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                <li>
                  <a href="#" className={`transition-colors ${isDarkMode ? "hover:text-white" : "hover:text-black"}`}>
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className={`transition-colors ${isDarkMode ? "hover:text-white" : "hover:text-black"}`}>
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className={`transition-colors ${isDarkMode ? "hover:text-white" : "hover:text-black"}`}>
                    Training
                  </a>
                </li>
                <li>
                  <a href="#" className={`transition-colors ${isDarkMode ? "hover:text-white" : "hover:text-black"}`}>
                    Resources
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className={`space-y-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                <li>
                  <a href="#" className={`transition-colors ${isDarkMode ? "hover:text-white" : "hover:text-black"}`}>
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className={`transition-colors ${isDarkMode ? "hover:text-white" : "hover:text-black"}`}>
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className={`transition-colors ${isDarkMode ? "hover:text-white" : "hover:text-black"}`}>
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className={`transition-colors ${isDarkMode ? "hover:text-white" : "hover:text-black"}`}>
                    Legal
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div
            className={`border-t mt-12 pt-8 text-center ${isDarkMode ? "border-gray-800 text-gray-400" : "border-gray-300 text-gray-600"}`}
          >
            <p>&copy; 2025 SportsRef®. All rights reserved. Built for the love of the game.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
