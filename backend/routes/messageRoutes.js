const express = require('express');
const {
  submitMessage,
  getMessages,
  markAsRead,
  deleteMessage
} = require('../controllers/messageController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .post(submitMessage)
  .get(protect, authorize('admin', 'manager'), getMessages);

router.route('/:id/read')
  .put(protect, authorize('admin', 'manager'), markAsRead);

router.route('/:id')
  .delete(protect, authorize('admin', 'manager'), deleteMessage);

module.exports = router;
