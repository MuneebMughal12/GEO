const GalleryMedia = require('../models/GalleryMedia');

// @desc    Get gallery media items
// @route   GET /api/gallery
// @access  Public
exports.getGallery = async (req, res) => {
  try {
    const { division, isPinnedHomepage } = req.query;
    const filter = {};
    if (division) filter.division = division;
    if (isPinnedHomepage) filter.isPinnedHomepage = isPinnedHomepage === 'true';

    const gallery = await GalleryMedia.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: gallery.length, data: gallery });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add media to gallery
// @route   POST /api/gallery
// @access  Private (Admin/Manager)
exports.uploadMedia = async (req, res) => {
  try {
    const { title, division, type, isPinnedHomepage, album } = req.body;
    let url = req.body.url;

    // If file uploaded via multer
    if (req.file) {
      url = `/uploads/${req.file.filename}`;
    }

    if (!url) {
      return res.status(400).json({ success: false, message: 'Please provide media URL or upload a file' });
    }

    const media = await GalleryMedia.create({
      title,
      url,
      type: type || 'image',
      album: album || 'General',
      division: division || 'GLOBAL',
      isPinnedHomepage: isPinnedHomepage === 'true' || isPinnedHomepage === true
    });

    res.status(201).json({ success: true, data: media });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete media
// @route   DELETE /api/gallery/:id
// @access  Private (Admin/Manager)
exports.deleteMedia = async (req, res) => {
  try {
    const media = await GalleryMedia.findByIdAndDelete(req.params.id);
    if (!media) {
      return res.status(404).json({ success: false, message: 'Media item not found' });
    }
    res.status(200).json({ success: true, message: 'Media removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle pinning to homepage
// @route   PUT /api/gallery/:id/pin
// @access  Private (Admin/Manager)
exports.togglePin = async (req, res) => {
  try {
    const media = await GalleryMedia.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ success: false, message: 'Media item not found' });
    }
    media.isPinnedHomepage = !media.isPinnedHomepage;
    await media.save();
    res.status(200).json({ success: true, data: media });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
