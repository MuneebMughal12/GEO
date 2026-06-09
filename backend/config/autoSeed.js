const User = require('../models/User');
const SiteSettings = require('../models/SiteSettings');

/**
 * Automatically seeds default Admin user and SiteSettings if they do not exist.
 */
const autoSeed = async () => {
  try {
    // 1. Seed Admin
    const adminCount = await User.countDocuments({ role: 'admin' });
    if (adminCount === 0) {
      await User.create({
        username: 'admin',
        email: 'admin@geogroup.global',
        password: 'AdminGeo2026!',
        role: 'admin',
      });
      console.log('--- AUTO-SEED: Default Admin user created (admin@geogroup.global)');
    }

    // 2. Seed Site Settings
    const settingsCount = await SiteSettings.countDocuments();
    if (settingsCount === 0) {
      await SiteSettings.create({
        siteName: 'GEO Group',
        tagline: 'Global Excellence & Order',
        contactEmail: 'contact@geogroup.global',
        contactPhone: '+971 4 000 0000',
        whatsappNumber: '+971500000000',
        address: '1200 Elite Tower, Financial District, Abu Dhabi, UAE',
        socialLinks: {
          linkedin: 'https://linkedin.com/company/geogroup',
          twitter: 'https://twitter.com/geogroup',
          facebook: 'https://facebook.com/geogroup',
          instagram: 'https://instagram.com/geogroup'
        },
        seo: {
          metaTitle: 'GEO Group | Building the Future with Precision & Innovation',
          metaDescription: 'A global conglomerate delivering excellence in architectural design, soil engineering, and large-scale infrastructure construction.',
          keywords: ['GEO Group', 'GEO ARC', 'GEO Soil Testing', 'GEO Construction', 'Civil Engineering', 'Geotechnical Investigation']
        }
      });
      console.log('--- AUTO-SEED: Default SiteSettings created');
    }
  } catch (error) {
    console.error('--- AUTO-SEED ERROR:', error.message);
  }
};

module.exports = autoSeed;
