const BookingRequest = require("../models/BookingRequest");
const Review = require("../models/Review");

async function getOfficialStats(officialId) {
  try {
    // Count accepted or confirmed booking requests
    const matchesCount = await BookingRequest.countDocuments({
      official: officialId,
      status: { $in: ["accepted", "confirmed"] },
    });

    // Retrieve all reviews for this official
    const reviews = await Review.find({ official: officialId });
    
    // Calculate average rating
    const avgRating = reviews.length
      ? parseFloat((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1))
      : 5.0; // Default to 5.0 rating

    return {
      totalMatches: matchesCount,
      rating: avgRating,
      reviewsCount: reviews.length,
    };
  } catch (error) {
    console.error("Error calculating official stats:", error);
    return {
      totalMatches: 0,
      rating: 5.0,
      reviewsCount: 0,
    };
  }
}

module.exports = { getOfficialStats };
