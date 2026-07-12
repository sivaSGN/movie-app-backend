// ============================================
// models/User.js
// Defines the shape of a "user" document stored in MongoDB.
// Mongoose uses this schema to validate and structure the data.
// ============================================

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,   // no two users can share the same email
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true, // this will store a HASHED password, never plain text
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("User", userSchema);