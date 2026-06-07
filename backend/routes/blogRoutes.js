const express = require('express');
const {
  getBlogPosts,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
} = require('../controllers/blogController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getBlogPosts)
  .post(protect, authorize('admin', 'manager'), createBlogPost);

router.route('/:slug')
  .get(getBlogPostBySlug);

router.route('/:id')
  .put(protect, authorize('admin', 'manager'), updateBlogPost)
  .delete(protect, authorize('admin', 'manager'), deleteBlogPost);

module.exports = router;
