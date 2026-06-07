const Company = require('../models/Company');
const SiteSettings = require('../models/SiteSettings');

// @desc    Get all divisions
// @route   GET /api/companies
// @access  Public
exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json({ success: true, data: companies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get division by slug
// @route   GET /api/companies/:slug
// @access  Public
exports.getCompanyBySlug = async (req, res) => {
  try {
    const company = await Company.findOne({ slug: req.params.slug });
    if (!company) {
      return res.status(404).json({ success: false, message: 'Division not found' });
    }
    res.status(200).json({ success: true, data: company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update division details
// @route   PUT /api/companies/:id
// @access  Private (Admin)
exports.updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!company) {
      return res.status(404).json({ success: false, message: 'Division not found' });
    }
    res.status(200).json({ success: true, data: company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get global site settings
// @route   GET /api/settings
// @access  Public
exports.getSettings = async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      // Create default settings if not exists
      settings = await SiteSettings.create({});
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update global site settings
// @route   PUT /api/settings
// @access  Private (Admin)
exports.updateSettings = async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(req.body);
    } else {
      settings = await SiteSettings.findByIdAndUpdate(settings._id, req.body, {
        new: true,
        runValidators: true
      });
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
