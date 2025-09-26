const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  location: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  current: { type: Boolean, default: false },
  description: { type: String },
  technologies: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Experience', ExperienceSchema);