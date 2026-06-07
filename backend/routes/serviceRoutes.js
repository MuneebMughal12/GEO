const express = require('express');
const {
  getServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService
} = require('../controllers/serviceController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getServices)
  .post(protect, authorize('admin', 'manager'), createService);

router.route('/:slug')
  .get(getServiceBySlug);

router.route('/:id')
  .put(protect, authorize('admin', 'manager'), updateService)
  .delete(protect, authorize('admin', 'manager'), deleteService);

module.exports = router;
