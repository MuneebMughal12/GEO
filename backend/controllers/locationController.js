const LocationPage = require('../models/LocationPage');

// @desc    Get all location pages
// @route   GET /api/locations
// @access  Public
exports.getLocationPages = async (req, res) => {
  try {
    const locations = await LocationPage.find().sort({ city: 1 });
    res.status(200).json({ success: true, count: locations.length, data: locations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get location page by slug
// @route   GET /api/locations/:slug
// @access  Public
exports.getLocationBySlug = async (req, res) => {
  try {
    const location = await LocationPage.findOne({ slug: req.params.slug });
    if (!location) {
      return res.status(404).json({ success: false, message: 'Location page not found' });
    }
    res.status(200).json({ success: true, data: location });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create location page
// @route   POST /api/locations
// @access  Private (Admin)
exports.createLocationPage = async (req, res) => {
  try {
    if (!req.body.slug && req.body.city && req.body.division) {
      req.body.slug = `${req.body.division.toLowerCase()}-testing-${req.body.city.toLowerCase()}`;
    }
    const location = await LocationPage.create(req.body);
    res.status(201).json({ success: true, data: location });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update location page
// @route   PUT /api/locations/:id
// @access  Private (Admin)
exports.updateLocationPage = async (req, res) => {
  try {
    const location = await LocationPage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!location) {
      return res.status(404).json({ success: false, message: 'Location page not found' });
    }
    res.status(200).json({ success: true, data: location });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete location page
// @route   DELETE /api/locations/:id
// @access  Private (Admin)
exports.deleteLocationPage = async (req, res) => {
  try {
    const location = await LocationPage.findByIdAndDelete(req.params.id);
    if (!location) {
      return res.status(404).json({ success: false, message: 'Location page not found' });
    }
    res.status(200).json({ success: true, message: 'Location page removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
