const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true },
  icon: { type: String },
  category: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Skill', SkillSchema);