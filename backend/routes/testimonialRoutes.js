const express = require('express');
const {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} = require('../controllers/testimonialController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getTestimonials)
  .post(protect, authorize('admin', 'manager'), createTestimonial);

router.route('/:id')
  .put(protect, authorize('admin', 'manager'), updateTestimonial)
  .delete(protect, authorize('admin', 'manager'), deleteTestimonial);

module.exports = router;
