// routes/visitor.js
const express = require("express");
const Visitor = require("../models/Visitor");
const router = express.Router();

// Helper: findout Client IP
function getClientIp(req) {
  const xfHeader = req.headers["x-forwarded-for"];
  if (xfHeader) {
    return xfHeader.split(",")[0].trim();
  }
  return req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
}

// increment visitor count
router.post("/visit", async (req, res) => {
  try {
    const ip = getClientIp(req);
    const userAgent = req.headers["user-agent"];

    // console.log('Received visit request:', { ip, userAgent });

    // if visitor with this IP doesn't exist, create new
    let visitor = await Visitor.findOne({ ip });
    // console.log('Existing visitor:', visitor);

    if (!visitor) {
      visitor = new Visitor({ ip, userAgent });
      await visitor.save();
    }

    const total = await Visitor.countDocuments();
    res.json({ total });
  } catch (err) {
    console.error('Visitor route error:', err.message);
    if (err.name === 'MongooseError') {
      console.error('Database connection error:', err);
      return res.status(500).json({ msg: "Database connection error" });
    }
    if (err.name === 'ValidationError') {
      console.error('Validation error:', err);
      return res.status(400).json({ msg: "Validation error", errors: err.errors });
    }
    console.error('Unexpected error:', err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// get visitor count
router.get("/total", async (req, res) => {
  try {
    const total = await Visitor.countDocuments();
    res.json({ total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
