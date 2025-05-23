const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const notificationController = require('../controllers/notificationController');

// Notification routes
router.get('/', authenticateToken, notificationController.getNotifications);
router.post('/', authenticateToken, authorizeRoles('admin', 'staff'), notificationController.createNotification);
router.put('/:id/read', authenticateToken, notificationController.markAsRead);
router.delete('/:id', authenticateToken, notificationController.deleteNotification);
router.post('/register-device', authenticateToken, notificationController.registerDevice);

module.exports = router;