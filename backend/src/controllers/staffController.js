const User = require('../models/User');
const Event = require('../models/Event');
const StaffAssignment = require('../models/StaffAssignment');

// Get all staff
exports.getStaff = async (req, res) => {
  try {
    const staffMembers = await User.findAll({
      where: { role: 'staff' },
      attributes: { exclude: ['password'] }
    });
    
    res.status(200).json({
      status: 'success',
      message: 'Staff members retrieved successfully',
      data: staffMembers
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

// Create new staff
exports.createStaff = async (req, res) => {
  try {
    // Ensure the role is set to 'staff'
    req.body.role = 'staff';
    
    const staffMember = await User.create(req.body);
    
    // Remove password from response
    const staffData = staffMember.toJSON();
    delete staffData.password;
    
    res.status(201).json({
      status: 'success',
      message: 'Staff member created successfully',
      data: staffData
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        status: 'error',
        message: 'Email already in use',
        data: null,
        errors: ['A user with this email already exists']
      });
    }
    
    res.status(400).json({
      status: 'error',
      message: 'Error creating staff member',
      data: null,
      errors: [error.message]
    });
  }
};

// Get staff by ID
exports.getStaffById = async (req, res) => {
  try {
    const staffId = req.params.id;
    
    const staffMember = await User.findOne({
      where: { 
        id: staffId,
        role: 'staff'
      },
      attributes: { exclude: ['password'] }
    });
    
    if (!staffMember) {
      return res.status(404).json({
        status: 'error',
        message: 'Staff member not found',
        data: null,
        errors: ['Staff member does not exist']
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Staff member retrieved successfully',
      data: staffMember
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving staff member',
      data: null,
      errors: [error.message]
    });
  }
};

// Update staff
exports.updateStaff = async (req, res) => {
  try {
    const staffId = req.params.id;
    const { name, email, phone, position, notes } = req.body;
    
    const staffMember = await User.findOne({
      where: {
        id: staffId,
        role: 'staff'
      }
    });
    
    if (!staffMember) {
      return res.status(404).json({
        status: 'error',
        message: 'Staff member not found',
        data: null,
        errors: ['Staff member does not exist']
      });
    }
    
    // Update staff fields
    if (name) staffMember.name = name;
    if (email) staffMember.email = email;
    if (phone) staffMember.phone = phone;
    if (position) staffMember.position = position;
    if (notes) staffMember.notes = notes;
    
    await staffMember.save();
    
    // Remove password from response
    const staffData = staffMember.toJSON();
    delete staffData.password;
    
    res.status(200).json({
      status: 'success',
      message: 'Staff member updated successfully',
      data: staffData
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error updating staff member',
      data: null,
      errors: [error.message]
    });
  }
};

// Delete staff
exports.deleteStaff = async (req, res) => {
  try {
    const staffId = req.params.id;
    
    const staffMember = await User.findOne({
      where: {
        id: staffId,
        role: 'staff'
      }
    });
    
    if (!staffMember) {
      return res.status(404).json({
        status: 'error',
        message: 'Staff member not found',
        data: null,
        errors: ['Staff member does not exist']
      });
    }
    
    await staffMember.destroy();
    
    res.status(200).json({
      status: 'success',
      message: 'Staff member deleted successfully',
      data: null
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error deleting staff member',
      data: null,
      errors: [error.message]
    });
  }
};

// Assign staff to event
exports.assignStaff = async (req, res) => {
  try {
    const { staffId, eventId, role } = req.body;
    
    // Check if staff exists
    const staffMember = await User.findOne({
      where: {
        id: staffId,
        role: 'staff'
      }
    });
    
    if (!staffMember) {
      return res.status(404).json({
        status: 'error',
        message: 'Staff member not found',
        data: null,
        errors: ['Staff member does not exist']
      });
    }
    
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
    
    // Create assignment
    const assignment = await StaffAssignment.create({
      staffId,
      eventId,
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

// Unassign staff from event
exports.unassignStaff = async (req, res) => {
  try {
    const assignmentId = req.params.id;
    
    const assignment = await StaffAssignment.findByPk(assignmentId);
    
    if (!assignment) {
      return res.status(404).json({
        status: 'error',
        message: 'Assignment not found',
        data: null,
        errors: ['Assignment does not exist']
      });
    }
    
    await assignment.destroy();
    
    res.status(200).json({
      status: 'success',
      message: 'Staff unassigned from event successfully',
      data: null
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error unassigning staff from event',
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
    const staffMember = await User.findOne({
      where: {
        id: staffId,
        role: 'staff'
      }
    });
    
    if (!staffMember) {
      return res.status(404).json({
        status: 'error',
        message: 'Staff member not found',
        data: null,
        errors: ['Staff member does not exist']
      });
    }
    
    // Get assignments with event details
    const schedule = await StaffAssignment.findAll({
      where: { staffId },
      include: [
        {
          model: Event,
          attributes: ['id', 'name', 'date', 'endDate', 'location', 'status']
        }
      ]
    });
    
    res.status(200).json({
      status: 'success',
      message: 'Staff schedule retrieved successfully',
      data: schedule
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