const TeamMember = require('../models/TeamMember');

// @desc    Get team members
// @route   GET /api/team
// @access  Public
exports.getTeamMembers = async (req, res) => {
  try {
    const { division } = req.query;
    const filter = division ? { division } : {};
    const team = await TeamMember.find(filter).sort({ createdAt: 1 });
    res.status(200).json({ success: true, count: team.length, data: team });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create team member
// @route   POST /api/team
// @access  Private (Admin)
exports.createTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.create(req.body);
    res.status(201).json({ success: true, data: member });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update team member
// @route   PUT /api/team/:id
// @access  Private (Admin)
exports.updateTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }
    res.status(200).json({ success: true, data: member });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete team member
// @route   DELETE /api/team/:id
// @access  Private (Admin)
exports.deleteTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }
    res.status(200).json({ success: true, message: 'Member removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
