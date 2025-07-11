const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

// POST /api/register - Register new user
router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      phone,
      location,
      sports,
      experience,
      organization,
      certifications,
      dateOfBirth,
      dateOfEstablishment,
    } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
      });
    }

    // Validate role - only allow official or organizer
    if (role && !["official", "organizer"].includes(role)) {
      return res.status(400).json({
        message: 'Role must be either "official" or "organizer"',
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      role: role || "official",
      phone,
      location,
      sports,
      experience,
      organization,
      certifications,
      ...(role === "official" && dateOfBirth ? { dateOfBirth } : {}),
      ...(role === "organizer" && dateOfEstablishment
        ? { dateOfEstablishment }
        : {}),
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      role: user.role,
      user: user.toJSON(),
    });
  } catch (error) {
    console.error("Registration error:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        message: "Validation error",
        errors,
      });
    }

    res.status(500).json({
      message: "Server error during registration",
    });
  }
});

// POST /api/register-admin - Register new admin user
router.post("/register-admin", async (req, res) => {
  try {
    const { name, email, password, adminSecret } = req.body;

    // Optional: Only allow if a special secret is provided (for security)
    if (process.env.ADMIN_SECRET && adminSecret !== process.env.ADMIN_SECRET) {
      return res.status(403).json({ message: "Invalid admin secret" });
    }

    // Check if an admin already exists (optional, for one-admin systems)
    // const existingAdmin = await User.findOne({ role: 'admin' });
    // if (existingAdmin) {
    //   return res.status(400).json({ message: 'Admin already exists' });
    // }

    // Validate required fields
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Create new admin user
    const user = new User({
      name,
      email,
      password,
      role: "admin",
    });
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "Admin registered successfully",
      token,
      role: user.role,
      user: user.toJSON(),
    });
  } catch (error) {
    console.error("Admin registration error:", error);
    res.status(500).json({ message: "Server error during admin registration" });
  }
});

// POST /api/login - Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Check for hardcoded admin login
    if (email === "admin@gameofficials.com" && password === "Admin@123") {
      const adminToken = jwt.sign(
        {
          userId: "admin",
          role: "admin",
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      return res.json({
        message: "Login successful",
        token: adminToken,
        role: "admin",
        user: {
          name: "Administrator",
          email: "admin@gameofficials.com",
          role: "admin",
        },
      });
    }

    // Regular user login
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login successful",
      token,
      role: user.role,
      user: user.toJSON(),
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Server error during login",
    });
  }
});

// GET /api/me - Get current user profile (protected route)
router.get("/me", authMiddleware, async (req, res) => {
  try {
    res.json({
      message: "User profile retrieved successfully",
      user: req.user,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      message: "Server error while retrieving profile",
    });
  }
});

module.exports = router;
