const Message = require('../models/Message');

// @desc    Submit new message (Contact Form)
// @route   POST /api/messages
// @access  Public
exports.submitMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).json({ success: true, message: 'Message sent successfully. We will contact you soon.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private (Admin/Manager)
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Mark message as read
// @route   PUT /api/messages/:id/read
// @access  Private (Admin/Manager)
exports.markAsRead = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    message.isRead = true;
    await message.save();
    res.status(200).json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private (Admin/Manager)
exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.status(200).json({ success: true, message: 'Message removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
