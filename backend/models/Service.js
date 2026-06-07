const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
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
  longDescription: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: 'engineering'
  },
  featuredImage: {
    type: String,
    default: ''
  },
  division: {
    type: String,
    enum: ['ARC', 'SOIL', 'CONSTRUCTION'],
    required: true
  },
  features: [{
    type: String
  }],
  processSteps: [{
    stepNumber: { type: Number },
    title: { type: String },
    description: { type: String }
  }],
  faqs: [{
    question: { type: String },
    answer: { type: String }
  }],
  seo: {
    metaTitle: { type: String },
    metaDescription: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);
