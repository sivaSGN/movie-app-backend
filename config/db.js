// ============================================
// config/db.js
// Handles connecting to MongoDB using Mongoose.
// Keeping this in its own file keeps server.js clean.
// ============================================

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // stop the server if the database can't connect
  }
};

module.exports = connectDB;