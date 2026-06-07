const mongoose = require('mongoose');

const TeamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  socialLinks: {
    linkedin: { type: String, default: '#' },
    twitter: { type: String, default: '#' }
  },
  experience: {
    type: String,
    default: ''
  },
  certifications: [{
    type: String
  }],
  division: {
    type: String,
    enum: ['ARC', 'SOIL', 'CONSTRUCTION', 'GLOBAL'],
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('TeamMember', TeamMemberSchema);
