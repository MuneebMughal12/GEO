const mongoose = require('mongoose');

const GalleryMediaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['image', 'video'],
    default: 'image'
  },
  album: {
    type: String,
    default: 'General'
  },
  division: {
    type: String,
    enum: ['ARC', 'SOIL', 'CONSTRUCTION', 'GLOBAL'],
    required: true
  },
  isPinnedHomepage: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('GalleryMedia', GalleryMediaSchema);
