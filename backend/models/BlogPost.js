const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: 'GEO Group Editor'
  },
  featuredImage: {
    type: String,
    default: ''
  },
  tags: [{
    type: String
  }],
  category: {
    type: String,
    required: true
  },
  division: {
    type: String,
    enum: ['ARC', 'SOIL', 'CONSTRUCTION', 'GLOBAL'],
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'published'
  },
  seo: {
    metaTitle: { type: String },
    metaDescription: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('BlogPost', BlogPostSchema);
