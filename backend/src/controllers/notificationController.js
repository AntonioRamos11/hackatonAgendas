const { Notification, Device } = require('../models/Notification');
const User = require('../models/User');

// Register device for push notifications
exports.registerDevice = async (req, res) => {
  try {
    const { userId, deviceToken, platform } = req.body;
    
    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
        data: null,
        errors: ['User does not exist']
      });
    }
    
    // Check if device is already registered
    let device = await Device.findOne({ where: { deviceToken } });
    
    if (device) {
      // Update existing device
      await device.update({ userId, platform });
    } else {
      // Register new device
      device = await Device.create({ userId, deviceToken, platform });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Device registered successfully',
      data: device
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Error registering device',
      data: null,
      errors: [error.message]
    });
  }
};

// Get user notifications
exports.getNotifications = async (req, res) => {
  try {
    // Assuming user ID is in the request from authentication middleware
    const userId = req.user.id;
    
    const notifications = await Notification.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json({
      status: 'success',
      message: 'Notifications retrieved successfully',
      data: notifications
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving notifications',
      data: null,
      errors: [error.message]
    });
  }
};

// Mark notification as read
exports.markAsRead = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const userId = req.user.id;
    
    const notification = await Notification.findOne({
      where: { id: notificationId, userId }
    });
    
    if (!notification) {
      return res.status(404).json({
        status: 'error',
        message: 'Notification not found',
        data: null,
        errors: ['Notification does not exist']
      });
    }
    
    await notification.update({ read: true });
    
    res.status(200).json({
      status: 'success',
      message: 'Notification marked as read',
      data: notification
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Error updating notification',
      data: null,
      errors: [error.message]
    });
  }
};

// Create notification
exports.createNotification = async (req, res) => {
  try {
    const { userId, title, message, type } = req.body;
    
    // Check if user exists
    const user = await User.findByPk(userId);
    
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
        data: null,
        errors: ['User does not exist']
      });
    }
    
    // Create notification
    const notification = await Notification.create({
      userId,
      title,
      message,
      type: type || 'system',
      read: false
    });
    
    res.status(201).json({
      status: 'success',
      message: 'Notification created successfully',
      data: notification
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Error creating notification',
      data: null,
      errors: [error.message]
    });
  }
};

// Delete notification
exports.deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const userId = req.user.id;
    
    const notification = await Notification.findOne({
      where: { id: notificationId, userId }
    });
    
    if (!notification) {
      return res.status(404).json({
        status: 'error',
        message: 'Notification not found',
        data: null,
        errors: ['Notification does not exist']
      });
    }
    
    await notification.destroy();
    
    res.status(200).json({
      status: 'success',
      message: 'Notification deleted successfully',
      data: null
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error deleting notification',
      data: null,
      errors: [error.message]
    });
  }
};