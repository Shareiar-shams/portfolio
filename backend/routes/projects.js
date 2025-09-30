// server/routes/projects.js
const express = require('express');
const multer = require('multer');
const createUploader = require("../config/multer");
const Project = require('../models/Project');
const auth = require('../middleware/auth');

const router = express.Router();

// Multer uploader for Projects
const uploadProjects = createUploader({
  folder: "portfolio/projects",
  allowedFormats: ["jpg", "jpeg", "png", "webp", "gif", "svg", "avif"],
  prefix: "project"
});

// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort('-createdAt');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// GET single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// POST (create project)
router.post("/", auth, uploadProjects.fields([
  { name: 'image', maxCount: 1 }
]), async (req, res) => {
  try {
    // Debug logs
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);
    
    const { title, description, liveDemo, sourceCode, technologies, featured } = req.body;
    
    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({ msg: 'Title and description are required' });
    }

    // Debug log for file
    if (req.files?.image) {
      console.log('Uploaded file details:', req.files.image[0]);
    }

    // Cloudinary URL if uploaded
    const imagePath = (req.files?.image && req.files.image[0]) 
      ? req.files.image[0].path 
      : "";

    console.log('Image path:', imagePath); // Debug log

    // Parse technologies safely
    let parsedTechnologies = [];
    try {
      parsedTechnologies = technologies ? JSON.parse(technologies) : [];
    } catch (err) {
      console.error('Technologies parsing error:', err);
      return res.status(400).json({ msg: 'Invalid technologies format' });
    }

    console.log('Parsed technologies:', parsedTechnologies); // Debug log

    const projectData = {
      title,
      description,
      image: imagePath,
      liveDemo: liveDemo || '',
      sourceCode: sourceCode || '',
      technologies: parsedTechnologies,
      featured: featured === 'true'
    };

    console.log('Project data to save:', projectData); // Debug log

    const project = new Project(projectData);
    const savedProject = await project.save();
    
    console.log('Saved project:', savedProject); // Debug log
    res.status(201).json(savedProject);

  } catch (err) {
    console.log(req.body);
    console.error('Project creation error:', {
      message: err.message,
      stack: err.stack,
      name: err.name
    });
    res.status(500).json({ 
      msg: 'Server error', 
      error: err.message,
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

// PUT (update project)
router.put('/:id', auth, uploadProjects.fields([
  { name: 'image', maxCount: 1 }
]), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    const { title, description, liveDemo, sourceCode, technologies, featured } = req.body;

    const updateData = {
      title: title || project.title,
      description: description || project.description,
      liveDemo: liveDemo || project.liveDemo,
      sourceCode: sourceCode || project.sourceCode,
      featured: featured === 'true'
    };

    // Update image if new one uploaded
    if (req.files?.image && req.files.image[0]) {
      updateData.image = req.files.image[0].path; // cloudinary URL
    }

    // Update technologies if provided
    if (technologies) {
      try {
        updateData.technologies = JSON.parse(technologies);
      } catch (err) {
        return res.status(400).json({ msg: 'Invalid technologies format' });
      }
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedProject);

  } catch (err) {
    console.error('Project update error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// DELETE project
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    // TODO: If you want, call cloudinary.uploader.destroy() here
    await Project.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Project and associated image deleted successfully' });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
