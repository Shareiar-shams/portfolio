// server/routes/projects.js
const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');

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
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, link, image, tech } = req.body;
    const project = new Project({ title, description, link, image, tech });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// PUT /api/projects/:id (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    res.json(project);
  } catch (err) {
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
