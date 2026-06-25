const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const User = require("../models/User");
const { authMiddleware, roleMiddleware, rolesMiddleware } = require("../middleware/auth");

// POST /api/reviews - Create a new review (Organizer only)
router.post("/", authMiddleware, roleMiddleware("organizer"), async (req, res) => {
  try {
    const { officialId, rating, reviewText, eventName } = req.body;

    if (!officialId || !rating || !reviewText) {
      return res.status(400).json({ message: "Official ID, rating, and review text are required" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    // Verify official exists and has 'official' role
    const official = await User.findOne({ _id: officialId, role: "official" });
    if (!official) {
      return res.status(404).json({ message: "Official not found" });
    }

    const review = new Review({
      organizer: req.user._id,
      official: officialId,
      rating,
      reviewText,
      eventName,
    });

    await review.save();

    res.status(201).json({
      message: "Review submitted successfully",
      review,
    });
  } catch (error) {
    console.error("Create review error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/reviews/official/:officialId - Get reviews for a specific official
router.get("/official/:officialId", authMiddleware, async (req, res) => {
  try {
    const reviews = await Review.find({ official: req.params.officialId })
      .populate("organizer", "name email")
      .sort({ createdAt: -1 });

    res.json({ reviews });
  } catch (error) {
    console.error("Get official reviews error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/reviews - Get all reviews (Admin only)
router.get("/", authMiddleware, rolesMiddleware(["admin"]), async (req, res) => {
  try {
    const reviews = await Review.find({})
      .populate("organizer", "name email")
      .populate("official", "name email")
      .sort({ createdAt: -1 });

    res.json({ reviews });
  } catch (error) {
    console.error("Get all reviews error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE /api/reviews/:id - Delete a review (Admin only)
router.delete("/:id", authMiddleware, rolesMiddleware(["admin"]), async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Delete review error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
