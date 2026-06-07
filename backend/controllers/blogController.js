const BlogPost = require('../models/BlogPost');

// @desc    Get all blog posts
// @route   GET /api/blog
// @access  Public
exports.getBlogPosts = async (req, res) => {
  try {
    const { division, tag, category, status } = req.query;
    const filter = {};
    if (division) filter.division = division;
    if (tag) filter.tags = tag;
    if (category) filter.category = category;
    if (status) filter.status = status;
    else filter.status = 'published'; // Default to published for public

    const posts = await BlogPost.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single blog post by slug
// @route   GET /api/blog/:slug
// @access  Public
exports.getBlogPostBySlug = async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create blog post
// @route   POST /api/blog
// @access  Private (Admin/Manager)
exports.createBlogPost = async (req, res) => {
  try {
    if (!req.body.slug && req.body.title) {
      req.body.slug = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }
    const post = await BlogPost.create(req.body);
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update blog post
// @route   PUT /api/blog/:id
// @access  Private (Admin/Manager)
exports.updateBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!post) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete blog post
// @route   DELETE /api/blog/:id
// @access  Private (Admin/Manager)
exports.deleteBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    res.status(200).json({ success: true, message: 'Article removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
