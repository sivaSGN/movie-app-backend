// ============================================
// middleware/authMiddleware.js
// Protects routes that should only work for logged-in users
// (we'll use this on the "Favorites" routes next).
// It checks for a valid JWT in the request's Authorization header.
// ============================================

const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization; // expected format: "Bearer <token>"

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Not authorized, no token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // attach the user's id to the request for later use
    next(); // token is valid — let the request continue to the actual route
  } catch (err) {
    return res.status(401).json({ error: "Not authorized, invalid or expired token" });
  }
};

module.exports = protect;