// ============================================
// routes/favoriteRoutes.js
// Every route here is wrapped with `protect` (authMiddleware),
// meaning a request MUST include a valid JWT, or it gets rejected
// with 401 before ever reaching the controller.
// ============================================

const express = require("express");
const router = express.Router();
const { addFavorite, getFavorites, removeFavorite } = require("../controllers/favoriteController");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, addFavorite);
router.get("/", protect, getFavorites);
router.delete("/:imdbID", protect, removeFavorite);

module.exports = router;