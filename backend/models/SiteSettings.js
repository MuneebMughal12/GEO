const mongoose = require('mongoose');

const SiteSettingsSchema = new mongoose.Schema({
  siteName: { type: String, default: 'GEO Group' },
  tagline: { type: String, default: 'Global Excellence & Order' },
  contactEmail: { type: String, default: 'contact@geogroup.global' },
  contactPhone: { type: String, default: '+971 4 000 0000' },
  whatsappNumber: { type: String, default: '+971500000000' },
  address: { type: String, default: '1200 Elite Tower, Financial District, Abu Dhabi, UAE' },
  socialLinks: {
    linkedin: { type: String, default: '#' },
    twitter: { type: String, default: '#' },
    facebook: { type: String, default: '#' },
    instagram: { type: String, default: '#' }
  },
  seo: {
    metaTitle: { type: String, default: 'GEO Group | Building the Future with Precision & Innovation' },
    metaDescription: { type: String, default: 'A global conglomerate delivering excellence in architectural design, soil engineering, and large-scale infrastructure construction.' },
    keywords: { type: [String], default: ['construction', 'architecture', 'soil testing', 'engineering'] }
  },
  homepage: {
    heroTitle: { type: String, default: 'Building the Future with Precision & Innovation' },
    heroSubtitle: { type: String, default: 'A global conglomerate delivering excellence in architectural design, soil engineering, and large-scale infrastructure construction.' },
    heroCTA1: { type: String, default: 'Explore Companies' },
    heroCTA2: { type: String, default: 'Contact Us' },
    aboutTitle: { type: String, default: 'Established Excellence in Global Infrastructure' },
    aboutText: { type: String, default: 'With over two decades of experience, GEO Group of Companies has stood as a pillar of reliability in the construction and engineering sectors. We integrate cutting-edge technology with traditional craftsmanship to deliver projects that shape the skylines of tomorrow.' },
    aboutMission: { type: String, default: 'To define new standards in sustainable construction and technical precision.' },
    aboutVision: { type: String, default: 'Becoming the global leader in integrated engineering and architectural services.' },
    stats: [{
      label: { type: String },
      value: { type: String }
    }],
    partners: [{
      name: { type: String }
    }]
  }
}, { timestamps: true });

module.exports = mongoose.model('SiteSettings', SiteSettingsSchema);
