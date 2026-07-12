// ============================================
// models/Favorite.js
// Represents one movie a user has saved to their favorites list.
// Linked to a specific user via the "user" field (a reference to User).
// ============================================

const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",       // links this favorite to a specific User document
      required: true,
    },
    imdbID: {
      type: String,
      required: true,    // the OMDb movie ID, e.g. "tt0372784"
    },
    title: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
    },
    year: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent the same user from favoriting the same movie twice
favoriteSchema.index({ user: 1, imdbID: 1 }, { unique: true });

module.exports = mongoose.model("Favorite", favoriteSchema);