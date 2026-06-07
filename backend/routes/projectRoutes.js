const express = require('express');
const {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getProjects)
  .post(protect, authorize('admin', 'manager'), createProject);

router.route('/:slug')
  .get(getProjectBySlug);

router.route('/:id')
  .put(protect, authorize('admin', 'manager'), updateProject)
  .delete(protect, authorize('admin', 'manager'), deleteProject);

module.exports = router;
