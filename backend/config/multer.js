const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

// Factory function: create storage for any folder
function createStorage(folder, allowedFormats, prefix) {
  return new CloudinaryStorage({
    cloudinary,
    params: {
      folder,
      allowed_formats: allowedFormats,
      public_id: () => `${prefix}_${Date.now()}`
    }
  });
}

// Upload middleware factory
function createUploader({ folder, allowedFormats, prefix }) {
  return multer({
    storage: createStorage(folder, allowedFormats, prefix),
  });
}

module.exports = createUploader;
