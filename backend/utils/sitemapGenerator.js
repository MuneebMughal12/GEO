const Service = require('../models/Service');
const Project = require('../models/Project');
const BlogPost = require('../models/BlogPost');
const LocationPage = require('../models/LocationPage');

const generateSitemapXml = async (hostUrl = 'https://geogroup.global') => {
  try {
    // 1. Static Pages
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${hostUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${hostUrl}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${hostUrl}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${hostUrl}/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${hostUrl}/geo-arc</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${hostUrl}/geo-soil-testing</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${hostUrl}/geo-construction</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;

    // 2. Fetch Services
    const services = await Service.find();
    services.forEach(service => {
      xml += `
  <url>
    <loc>${hostUrl}/services/${service.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    // 3. Fetch Projects
    const projects = await Project.find();
    projects.forEach(project => {
      xml += `
  <url>
    <loc>${hostUrl}/projects/${project.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    });

    // 4. Fetch Blog Posts
    const posts = await BlogPost.find({ status: 'published' });
    posts.forEach(post => {
      xml += `
  <url>
    <loc>${hostUrl}/blog/${post.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
    });

    // 5. Fetch Locations (Local SEO)
    const locations = await LocationPage.find();
    locations.forEach(location => {
      xml += `
  <url>
    <loc>${hostUrl}/soil-testing-${location.city.toLowerCase()}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    xml += `
</urlset>`;
    return xml;
  } catch (error) {
    console.error('Failed to generate sitemap:', error);
    return '';
  }
};

module.exports = generateSitemapXml;
