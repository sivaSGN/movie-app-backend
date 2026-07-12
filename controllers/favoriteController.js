// ============================================
// controllers/favoriteController.js
// Handles adding, listing, and removing a logged-in user's
// favorite movies. Every function here assumes authMiddleware
// already ran and attached req.userId — see routes/favoriteRoutes.js
// ============================================

const Favorite = require("../models/Favorite");

// POST /api/favorites   (protected)
const addFavorite = async (req, res) => {
  const { imdbID, title, poster, year } = req.body;

  if (!imdbID || !title) {
    return res.status(400).json({ error: "imdbID and title are required" });
  }

  try {
    const favorite = await Favorite.create({
      user: req.userId,
      imdbID,
      title,
      poster,
      year,
    });

    res.status(201).json(favorite);
  } catch (err) {
    // Our schema has a unique index on {user, imdbID} — this catches duplicates
    if (err.code === 11000) {
      return res.status(409).json({ error: "This movie is already in your favorites" });
    }
    console.error(err);
    res.status(500).json({ error: "Server error while adding favorite" });
  }
};

// GET /api/favorites   (protected) — returns only the logged-in user's favorites
const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(favorites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while fetching favorites" });
  }
};

// DELETE /api/favorites/:imdbID   (protected)
const removeFavorite = async (req, res) => {
  const { imdbID } = req.params;

  try {
    const deleted = await Favorite.findOneAndDelete({
      user: req.userId,
      imdbID,
    });

    if (!deleted) {
      return res.status(404).json({ error: "Favorite not found" });
    }

    res.json({ message: "Removed from favorites" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while removing favorite" });
  }
};

module.exports = { addFavorite, getFavorites, removeFavorite };