// server/routes/experience.js
const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');
const auth = require('../middleware/auth');

// GET /api/experience
router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find().sort('-createdAt');
    res.json(experiences);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// GET /api/experience/:id
router.get('/:id', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ msg: 'Experience not found' });
    }
    res.json(experience);
  } catch (err) {
    console.error('Error fetching experience:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});


// POST /api/experience (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { company, position, location, startDate, endDate, current, description, technologies } = req.body;

    const experience = new Experience({
      company,
      position,
      location,
      startDate,
      endDate,
      current,
      description,
      technologies
    });

    await experience.save();
    res.status(201).json(experience);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// PUT /api/experience/:id (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!experience) return res.status(404).json({ msg: 'Experience not found' });

    res.json(experience);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// DELETE /api/experience/:id (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);

    if (!experience) return res.status(404).json({ msg: 'Experience not found' });

    res.json({ msg: 'Experience deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
