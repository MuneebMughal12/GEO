const express = require('express');
const {
  getGallery,
  uploadMedia,
  deleteMedia,
  togglePin
} = require('../controllers/galleryController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.route('/')
  .get(getGallery)
  .post(protect, authorize('admin', 'manager'), upload.single('file'), uploadMedia);

router.route('/:id')
  .delete(protect, authorize('admin', 'manager'), deleteMedia);

router.route('/:id/pin')
  .put(protect, authorize('admin', 'manager'), togglePin);

module.exports = router;
