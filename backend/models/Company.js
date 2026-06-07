const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  tagline: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  aboutText: {
    type: String,
    default: ''
  },
  featuredImage: {
    type: String,
    default: ''
  },
  heroVideo: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: 'architecture' // Material icon name
  },
  division: {
    type: String,
    enum: ['ARC', 'SOIL', 'CONSTRUCTION'],
    required: true
  },
  certifications: [{
    title: { type: String },
    subtitle: { type: String },
    icon: { type: String, default: 'verified' }
  }],
  seo: {
    metaTitle: { type: String },
    metaDescription: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('Company', CompanySchema);
