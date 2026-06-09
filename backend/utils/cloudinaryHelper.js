const cloudinary = require('../config/cloudinary');
const fs = require('fs');

/**
 * Uploads a file to Cloudinary and deletes the local temporary file
 * @param {string} filePath - Local path of the uploaded file
 * @param {string} folderName - Cloudinary folder name
 */
const uploadToCloudinary = async (filePath, folderName = 'geo_group') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folderName,
      resource_type: 'auto', // Automatically detects images, videos, or raw files like PDFs
    });

    // Remove the file from local disk storage after uploading to Cloudinary
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return result.secure_url; // Returns the permanent URL
  } catch (error) {
    // Make sure we delete local file even if upload fails
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw error;
  }
};

module.exports = { uploadToCloudinary };
