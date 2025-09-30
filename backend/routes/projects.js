// server/routes/projects.js
const express = require('express');
const multer = require('multer');
const createUploader = require("../config/multer");
const Project = require('../models/Project');
const auth = require('../middleware/auth');

const path = require('path');
const fs = require('fs');
const router = express.Router();

// Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // Different folders for different file types
//     const dest = 'uploads/projects/';
//     cb(null, dest);
//   },
//   filename: (req, file, cb) => {
//     // Create unique filename with original extension
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const upload = multer({ 
//   storage,
//   fileFilter: (req, file, cb) => {
//     // Allow only images
//     if (!file.mimetype.startsWith('image/')) {
//       return cb(new Error('Only image files are allowed!'), false);
//     }
//     cb(null, true);
//   }
// });

// Multer uploader for Projects
const uploadProjects = createUploader({
  folder: "portfolio/projects",
  allowedFormats: ["jpg", "jpeg", "png", "webp"],
  prefix: "project"
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
router.post("/", auth, uploadProjects.fields([
  { name: 'image', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, description, liveDemo, sourceCode, technologies, featured } = req.body;
    
    // Log incoming data for debugging
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({ msg: 'Title and description are required' });
    }

    const imagePath = req.files && req.files["image"] && req.files["image"][0]
      ? req.files["image"][0].path
      : "";

    // Safely parse technologies
    let parsedTechnologies = [];
    try {
      parsedTechnologies = technologies ? JSON.parse(technologies) : [];
    } catch (error) {
      console.error('Error parsing technologies:', error);
      return res.status(400).json({ msg: 'Invalid technologies format' });
    }

    const project = new Project({
      title,
      description,
      image: imagePath,
      liveDemo: liveDemo || '',
      sourceCode: sourceCode || '',
      technologies: parsedTechnologies,
      featured: featured === 'true'
    });

    await project.save();
    res.status(201).json(project);
  } catch (err) {
    console.error('Project creation error:', err);
    res.status(500).json({ 
      msg: 'Server error', 
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

// PUT /api/projects/:id (protected)
router.put('/:id', auth, uploadProjects.fields([
  { name: 'image', maxCount: 1 }
]), async (req, res) => {
  try {
    // Log incoming data for debugging
    console.log('Update request body:', req.body);
    console.log('Update request files:', req.files);

    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    const { title, description, liveDemo, sourceCode, technologies, featured } = req.body;

    // Create update object
    const updateData = {
      title: title || project.title,
      description: description || project.description,
      liveDemo: liveDemo || project.liveDemo,
      sourceCode: sourceCode || project.sourceCode,
      featured: featured === 'true'
    };

    // Handle technologies
    if (technologies) {
      try {
        updateData.technologies = JSON.parse(technologies);
      } catch (error) {
        return res.status(400).json({ msg: 'Invalid technologies format' });
      }
    }

    // Handle image update
    if (req.files && req.files["image"] && req.files["image"][0]) {
      updateData.image = req.files["image"][0].path;
    }

    // Update the project
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedProject);
  } catch (err) {
    console.error('Project update error:', err);
    res.status(500).json({ 
      msg: 'Server error', 
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

// DELETE /api/projects/:id (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    // First find the project to get the image path
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    // If project has an image, delete it from the uploads folder
    // if (project.image) {
    //   const imagePath = path.join(__dirname, '..', project.image);
    //   try {
    //     if (fs.existsSync(imagePath)) {
    //       fs.unlinkSync(imagePath);
    //       // console.log(`Deleted image file: ${imagePath}`);
    //     }
    //   } catch (err) {
    //     console.error('Error deleting project image:', err);
    //   }
    // }

    // Now delete the project from the database
    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Project and associated image deleted successfully' });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
