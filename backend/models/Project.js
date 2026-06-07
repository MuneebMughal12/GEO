const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  clientName: {
    type: String,
    required: true
  },
  division: {
    type: String,
    enum: ['ARC', 'SOIL', 'CONSTRUCTION'],
    required: true
  },
  category: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  completionDate: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Ongoing', 'Completed'],
    default: 'Ongoing'
  },
  images: [{
    type: String
  }],
  videos: [{
    type: String
  }],
  documents: [{
    name: { type: String },
    url: { type: String }
  }],
  isFeatured: {
    type: Boolean,
    default: false
  },
  isPinnedHomepage: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
