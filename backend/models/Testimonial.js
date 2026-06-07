const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  image: {
    type: String,
    default: ''
  },
  division: {
    type: String,
    enum: ['ARC', 'SOIL', 'CONSTRUCTION', 'GLOBAL'],
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', TestimonialSchema);
