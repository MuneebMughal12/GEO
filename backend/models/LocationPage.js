const mongoose = require('mongoose');

const LocationPageSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  division: {
    type: String,
    enum: ['ARC', 'SOIL', 'CONSTRUCTION', 'GLOBAL'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  faqs: [{
    question: { type: String },
    answer: { type: String }
  }],
  seo: {
    metaTitle: { type: String },
    metaDescription: { type: String }
  }
}, { timestamps: true });

// Ensure unique combination of city and division
LocationPageSchema.index({ city: 1, division: 1 }, { unique: true });

module.exports = mongoose.model('LocationPage', LocationPageSchema);
