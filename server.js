// ============================================
// server.js — Entry point of our Express backend
// ============================================

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const movieRoutes = require("./routes/movieRoutes");
const authRoutes = require("./routes/authRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoriteRoutes);

app.get("/", (req, res) => {
  res.send("🎬 Movie API is running!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});