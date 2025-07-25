const express = require("express");
const router = express.Router();
const Availability = require("../models/Availability");
const { authMiddleware } = require("../middleware/auth");

// Add availability
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { startDate, endDate, officialId } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of today
    // Find an 'available' record for this official with endDate >= today
    let availability = await Availability.findOne({
      official: officialId,
      status: "available",
      endDate: { $gte: today },
    });
    if (availability) {
      // Update existing future/present availability
      availability.startDate = new Date(startDate);
      availability.endDate = new Date(endDate);
      await availability.save();
      return res.status(200).json(availability);
    } else {
      // Create new (all previous are expired)
      availability = new Availability({
        official: officialId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      });
      await availability.save();
      return res.status(201).json(availability);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get official's availability
router.get("/:officialId", async (req, res) => {
  try {
    const availabilities = await Availability.find({
      official: req.params.officialId,
      status: "available",
    });
    res.json(availabilities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete current/future availability for an official
router.delete("/:officialId", authMiddleware, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const result = await Availability.findOneAndDelete({
      official: req.params.officialId,
      status: "available",
      endDate: { $gte: today },
    });
    if (result) {
      return res.status(200).json({ message: "Availability deleted" });
    } else {
      return res.status(404).json({ message: "No active availability found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
