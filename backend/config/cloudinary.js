// config/cloudinary.js
const cloudinary = require("cloudinary").v2;
require('dotenv').config();

// Configure Cloudinary with environment variables

cloudinary.config({
  cloud_name: process.env.ARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
