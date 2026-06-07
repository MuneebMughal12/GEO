const Project = require('../models/Project');
const Service = require('../models/Service');
const TeamMember = require('../models/TeamMember');
const GalleryMedia = require('../models/GalleryMedia');
const Message = require('../models/Message');

// @desc    Get dashboard statistics and activities
// @route   GET /api/dashboard
// @access  Private
const getDashboardStats = async (req, res, next) => {
  try {
    const [
      projectCount,
      serviceCount,
      teamCount,
      galleryCount,
      messageCount,
      recentProjects,
      recentMessages,
      recentTeam
    ] = await Promise.all([
      Project.countDocuments(),
      Service.countDocuments(),
      TeamMember.countDocuments(),
      GalleryMedia.countDocuments(),
      Message.countDocuments(),
      Project.find().sort({ createdAt: -1 }).limit(5),
      Message.find().sort({ createdAt: -1 }).limit(5),
      TeamMember.find().sort({ createdAt: -1 }).limit(5)
    ]);

    // Map database entries to activity items
    const activities = [];

    recentProjects.forEach(proj => {
      activities.push({
        id: `proj-${proj._id}`,
        title: 'Project Added / Updated',
        desc: `"${proj.name}" project details were modified for division ${proj.division}.`,
        time: formatRelativeTime(proj.createdAt),
        createdAt: proj.createdAt,
        icon: 'apartment',
        color: 'border-primary-container'
      });
    });

    recentMessages.forEach(msg => {
      activities.push({
        id: `msg-${msg._id}`,
        title: 'New message received',
        desc: `Inquiry from ${msg.name} regarding division ${msg.division || 'GEO Group'}.`,
        time: formatRelativeTime(msg.createdAt),
        createdAt: msg.createdAt,
        icon: 'chat_bubble',
        color: 'border-secondary'
      });
    });

    recentTeam.forEach(t => {
      activities.push({
        id: `team-${t._id}`,
        title: 'Team member updated',
        desc: `${t.name} onboarded or updated under designation "${t.designation}".`,
        time: formatRelativeTime(t.createdAt),
        createdAt: t.createdAt,
        icon: 'person_add',
        color: 'border-tertiary-fixed-variant'
      });
    });

    // Sort combined activities by createdAt desc
    activities.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Limit to top 6 activities
    const latestActivities = activities.slice(0, 6);

    res.status(200).json({
      success: true,
      stats: {
        projects: projectCount,
        services: serviceCount,
        team: teamCount,
        gallery: galleryCount,
        messages: messageCount
      },
      activities: latestActivities
    });

  } catch (error) {
    next(error);
  }
};

// Helper function to format relative time
function formatRelativeTime(date) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins} mins ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}

module.exports = { getDashboardStats };
