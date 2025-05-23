const User = require('../models/User');
const Event = require('../models/Event');
const { StaffAssignment } = require('../models/Event');

// Get all staff members
exports.getStaff = async (req, res) => {
  try {
    const staff = await User.findAll({
      where: { role: 'staff' },
      attributes: ['id', 'name', 'email', 'phoneNumber']
    });
    
    res.status(200).json({
      status: 'success',
      message: 'Staff members retrieved successfully',
      data: staff
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving staff members',
      data: null,
      errors: [error.message]
    });
  }
};

// Assign staff to event
exports.assignStaff = async (req, res) => {
  try {
    const { eventId, staffId, role } = req.body;
    
    // Check if event exists
    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found',
        data: null,
        errors: ['Event does not exist']
      });
    }
    
    // Check if staff exists
    const staff = await User.findOne({
      where: { id: staffId, role: 'staff' }
    });
    if (!staff) {
      return res.status(404).json({
        status: 'error',
        message: 'Staff member not found',
        data: null,
        errors: ['Staff member does not exist']
      });
    }
    
    // Create assignment
    const assignment = await StaffAssignment.create({
      eventId,
      staffId,
      role
    });
    
    res.status(201).json({
      status: 'success',
      message: 'Staff assigned to event successfully',
      data: assignment
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Error assigning staff to event',
      data: null,
      errors: [error.message]
    });
  }
};

// Get staff schedule
exports.getStaffSchedule = async (req, res) => {
  try {
    const staffId = req.params.id;
    
    // Check if staff exists
    const staff = await User.findOne({
      where: { id: staffId, role: 'staff' }
    });
    
    if (!staff) {
      return res.status(404).json({
        status: 'error',
        message: 'Staff member not found',
        data: null,
        errors: ['Staff member does not exist']
      });
    }
    
    // Get staff assignments
    const assignments = await StaffAssignment.findAll({
      where: { staffId },
      include: [{
        model: Event,
        attributes: ['id', 'name', 'date', 'endDate', 'location', 'status']
      }]
    });
    
    res.status(200).json({
      status: 'success',
      message: 'Staff schedule retrieved successfully',
      data: assignments
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving staff schedule',
      data: null,
      errors: [error.message]
    });
  }
};