// server/routes/projects.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');


// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Different folders for different file types
    const dest = 'uploads/projects/';
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
    // Allow only images
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

// GET /api/projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort('-createdAt');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// POST /api/projects (protected)
router.post("/", auth, upload.fields([
  { name: 'image', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, description, link, image, tech } = req.body;
     // Handle file paths
    const image = req.files['image'] ? 
      `/uploads/about/images/${req.files['image'][0].filename}` : '';

    const project = new Project({ title, description, link, image, tech });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// PUT /api/projects/:id (protected)
// PUT /api/projects/:id (protected)
router.put('/:id', auth, upload.fields([
  { name: 'image', maxCount: 1 }
]), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    // fetch update fileds from req.body
    const { title, description, link, tech } = req.body;

    project.title = title || project.title;
    project.description = description || project.description;
    project.link = link || project.link;
    project.tech = tech || project.tech;

    // if new image is uploaded, update the path
    if (req.files['image']) {
      project.image = `/uploads/projects/${req.files['image'][0].filename}`;
    }

    // if no new image is uploaded, keep existing path (no action needed)
    await project.save();
    res.json(project);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// DELETE /api/projects/:id (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    res.json({ msg: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
