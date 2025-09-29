const express = require('express');
const multer = require('multer');
const path = require('path');
const About = require('../models/About');
const auth = require('../middleware/auth');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Different folders for different file types
    const dest = file.fieldname === 'profileImage' ? 'uploads/about/images' : 'uploads/about/resumes';
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    // Create unique filename with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'profileImage') {
      // Allow only images
      if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Only image files are allowed!'), false);
      }
    } else if (file.fieldname === 'resume') {
      // Allow only pdfs and documents
      const allowedMimes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedMimes.includes(file.mimetype)) {
        return cb(new Error('Only PDF and Word documents are allowed!'), false);
      }
    }
    cb(null, true);
  }
});

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
router.post("/", auth, upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'resume', maxCount: 1 }
]), async (req, res) => {
  try {
    const { name, title, description, contactEmail, socialLinks } = req.body;

    // Handle file paths
    const profileImage = req.files['profileImage'] ? 
      `/uploads/about/images/${req.files['profileImage'][0].filename}` : '';
    const resumeLink = req.files['resume'] ? 
      `/uploads/about/resumes/${req.files['resume'][0].filename}` : '';

    const about = new About({
      name,
      title,
      description,
      contactEmail,
      socialLinks: JSON.parse(socialLinks),
      profileImage,
      resumeLink
    });

    await about.save();
    res.json(about);
  } catch (err) {
    console.error('Error creating/updating about info:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ msg: err.message });
    }
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// PUT /api/about → Update existing (protected)
router.put("/", auth, upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'resume', maxCount: 1 }
]), async (req, res) => {
  try {
    const { name, title, description, contactEmail, socialLinks } = req.body;
    const updateData = {
      name,
      title,
      description,
      contactEmail,
      socialLinks: JSON.parse(socialLinks),
      profileImage,
      resumeLink
    };

    // Only update file paths if new files were uploaded
    if (req.files['profileImage']) {
      updateData.profileImage = `/uploads/about/images/${req.files['profileImage'][0].filename}`;
    } else if (req.body.profileImage) {
      updateData.profileImage = req.body.profileImage;
    }

    if (req.files['resume']) {
      updateData.resumeLink = `/uploads/about/resumes/${req.files['resume'][0].filename}`;
    } else if (req.body.resumeLink) {
      updateData.resumeLink = req.body.resumeLink;
    }

    const about = await About.findOneAndUpdate({}, updateData, { new: true });
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
