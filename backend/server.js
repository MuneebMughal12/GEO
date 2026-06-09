const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const generateSitemapXml = require('./utils/sitemapGenerator');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Dynamic SEO sitemap.xml
app.get('/sitemap.xml', async (req, res) => {
  const host = process.env.FRONTEND_URL || `${req.protocol}://${req.get('host')}`;
  const sitemapXml = await generateSitemapXml(host);
  res.header('Content-Type', 'application/xml');
  res.status(200).send(sitemapXml);
});

// Dynamic robots.txt
app.get('/robots.txt', (req, res) => {
  const host = process.env.FRONTEND_URL || `${req.protocol}://${req.get('host')}`;
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /
Sitemap: ${host}/sitemap.xml
`);
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/companies', require('./routes/companyRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/team', require('./routes/teamRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/blog', require('./routes/blogRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/locations', require('./routes/locationRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

// Root path fallback
app.get('/', (req, res) => {
  res.json({ message: 'GEO Group API Service is running...' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

module.exports = app;
