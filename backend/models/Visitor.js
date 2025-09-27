// backend/models/Visitor.js
const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
  ip: { type: String, unique: true },
  userAgent: {type: String},
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Visitor', VisitorSchema);
