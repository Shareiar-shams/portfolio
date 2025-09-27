// routes/visitor.js
const express = require("express");
const Visitor = require("../models/Visitor");
const router = express.Router();

// Helper: findout Client IP
function getClientIp(req) {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.ip
  );
}

// increment visitor count
router.post("/visit", async (req, res) => {
  try {
    const ip = getClientIp(req);
    const userAgent = req.headers["user-agent"];

    // if visitor with this IP doesn't exist, create new
    let visitor = await Visitor.findOne({ ip });
    if (!visitor) {
      visitor = new Visitor({ ip, userAgent });
      await visitor.save();
    }

    const total = await Visitor.countDocuments();
    res.json({ total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
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
