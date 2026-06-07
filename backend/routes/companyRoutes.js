const express = require('express');
const {
  getCompanies,
  getCompanyBySlug,
  updateCompany,
  getSettings,
  updateSettings
} = require('../controllers/companyController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Site settings routes
router.route('/settings')
  .get(getSettings)
  .put(protect, authorize('admin'), updateSettings);

// Company divisions routes
router.route('/')
  .get(getCompanies);

router.route('/:slug')
  .get(getCompanyBySlug);

router.route('/:id')
  .put(protect, authorize('admin'), updateCompany);

module.exports = router;
