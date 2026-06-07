const express = require('express');
const {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
} = require('../controllers/teamController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getTeamMembers)
  .post(protect, authorize('admin'), createTeamMember);

router.route('/:id')
  .put(protect, authorize('admin'), updateTeamMember)
  .delete(protect, authorize('admin'), deleteTeamMember);

module.exports = router;
