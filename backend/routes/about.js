const express = require("express");
const router = express.Router();
const About = require("../models/About");
const auth = require('../middleware/auth');

// GET /api/about → Get About info
router.get("/", async (req, res) => {
  try {
    const about = await About.findOne().sort({ createdAt: -1 }); // get the latest about doc
    if (!about) {
      return res.status(404).json({ msg: "No about information found" });
    }
    res.json(about);
  } catch (err) {
    console.error('Error fetching about info:', err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// POST /api/about → Create new (protected)
router.post("/", auth, async (req, res) => {
  try {
    // Validate required fields
    const { name, title, description } = req.body;
    if (!name || !title || !description) {
      return res.status(400).json({ 
        msg: "Please provide all required fields (name, title, description)" 
      });
    }

    // Check if about info already exists
    const existingAbout = await About.findOne();
    if (existingAbout) {
      return res.status(400).json({ 
        msg: "About information already exists. Use PUT to update." 
      });
    }

    const about = new About(req.body);
    await about.save();
    res.status(201).json(about);
  } catch (err) {
    console.error('Error creating about info:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ msg: err.message });
    }
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// PUT /api/about → Update existing (protected)
router.put("/", auth, async (req, res) => {
  try {
    // Validate required fields
    const { name, title, description } = req.body;
    if (!name || !title || !description) {
      return res.status(400).json({ 
        msg: "Please provide all required fields (name, title, description)" 
      });
    }

    // Find and update the latest about document, or create new if none exists
    let about = await About.findOne();
    
    if (!about) {
      about = new About(req.body);
    } else {
      // Update existing document
      Object.assign(about, req.body);
    }

    await about.save();
    res.json(about);
  } catch (err) {
    console.error('Error updating about info:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ msg: err.message });
    }
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// DELETE /api/about → Delete (optional, protected)
router.delete("/", auth, async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ msg: "About info not found" });
    }
    await About.deleteOne({ _id: about._id });
    res.json({ msg: "About info deleted successfully" });
  } catch (err) {
    console.error('Error deleting about info:', err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
