// ============================================
// routes/movieRoutes.js
// Defines URL paths and links them to controller functions
// ============================================

const express = require("express");
const router = express.Router();
const { searchMovies, getMovieById } = require("../controllers/movieController");

// GET /api/movies/search?q=batman
router.get("/search", searchMovies);

// GET /api/movies/tt1375666  (imdbID)
router.get("/:id", getMovieById);

module.exports = router;