const express = require('express');
const {
  getLocationPages,
  getLocationBySlug,
  createLocationPage,
  updateLocationPage,
  deleteLocationPage
} = require('../controllers/locationController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getLocationPages)
  .post(protect, authorize('admin'), createLocationPage);

router.route('/:slug')
  .get(getLocationBySlug);

router.route('/:id')
  .put(protect, authorize('admin'), updateLocationPage)
  .delete(protect, authorize('admin'), deleteLocationPage);

module.exports = router;
