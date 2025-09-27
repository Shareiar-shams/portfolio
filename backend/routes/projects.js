// server/routes/projects.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
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

// GET /api/projects/:id
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    console.error('Error fetching project:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// POST /api/projects (protected)
router.post("/", auth, upload.fields([
  { name: 'image', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, description, liveDemo, sourceCode, technologies, featured } = req.body;
    
    // Handle file paths
    const imagePath = req.files['image'] ? 
      `/uploads/projects/${req.files['image'][0].filename}` : '';

    const project = new Project({
      title,
      description,
      image: imagePath,
      liveDemo,
      sourceCode,
      technologies: technologies ? JSON.parse(technologies) : [],
      featured: featured === 'true'
    });

    await project.save();
    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// PUT /api/projects/:id (protected)
router.put('/:id', auth, upload.fields([
  { name: 'image', maxCount: 1 }
]), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    // Update fields from form data
    const { title, description, liveDemo, sourceCode, technologies, featured } = req.body;

    // Update project fields
    project.title = title || project.title;
    project.description = description || project.description;
    project.liveDemo = liveDemo || project.liveDemo;
    project.sourceCode = sourceCode || project.sourceCode;
    project.featured = featured === 'true';
    
    // Handle technologies
    if (technologies) {
      project.technologies = JSON.parse(technologies);
    }

    // Handle image update
    if (req.files && req.files['image']) {
      // Delete old image if exists
      if (project.image) {
        const oldImagePath = path.join(__dirname, '..', project.image);
        try {
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        } catch (err) {
          console.error('Error deleting old image:', err);
        }
      }
      
      project.image = `/uploads/projects/${req.files['image'][0].filename}`;
    }

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
    // First find the project to get the image path
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    // If project has an image, delete it from the uploads folder
    if (project.image) {
      const imagePath = path.join(__dirname, '..', project.image);
      try {
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
          // console.log(`Deleted image file: ${imagePath}`);
        }
      } catch (err) {
        console.error('Error deleting project image:', err);
      }
    }

    // Now delete the project from the database
    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Project and associated image deleted successfully' });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
