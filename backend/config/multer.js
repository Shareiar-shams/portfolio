const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

function createStorage(folder, allowedFormats, prefix) {
  return new CloudinaryStorage({
    cloudinary,
    params: {
      folder,
      allowed_formats: allowedFormats,
      public_id: (req, file) => {
        return `${prefix}_${Date.now()}_${Math.round(Math.random() * 1E9)}`;
      },
      resource_type: "auto"
    }
  });
}

function createUploader({ folder, allowedFormats, prefix }) {
  const upload = multer({
    storage: createStorage(folder, allowedFormats, prefix),
    limits: {
      fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
      // Check file type
      if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Only image files are allowed!'), false);
      }
      cb(null, true);
    }
  });

  return upload;
}

module.exports = createUploader;
