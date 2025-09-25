const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
  name: { type: String, required: true },              // Your name
  title: { type: String, required: true },             // e.g. "Full Stack Developer"
  description: { type: String, required: true },       // Short bio/intro
  profileImage: { type: String },                      // Optional profile picture URL
  resumeLink: { type: String },                        // Optional resume link
  contactEmail: { type: String },                      // Optional email
  socialLinks: {                                       // Optional social links
    github: { type: String },
    linkedin: { type: String },
    twitter: { type: String }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("About", AboutSchema);
