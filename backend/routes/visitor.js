// routes/visitor.js
const express = require("express");
const Visitor = require("../models/Visitor");
const router = express.Router();

// increment visitor count
router.post("/visit", async (req, res) => {
  try {
    let visitor = await Visitor.findOne();
    if (!visitor) {
      visitor = new Visitor({ count: 1 });
    } else {
      visitor.count += 1;
    }
    await visitor.save();
    res.json({ total: visitor.count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// get visitor count
router.get("/total", async (req, res) => {
  try {
    const visitor = await Visitor.findOne();
    res.json({ total: visitor ? visitor.count : 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
