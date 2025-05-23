const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const eventController = require('../controllers/eventController');

// Event routes
router.get('/', authenticateToken, eventController.getEvents);
router.get('/:id', authenticateToken, eventController.getEventById);
router.post('/', authenticateToken, authorizeRoles('admin', 'staff'), eventController.createEvent);
router.put('/:id', authenticateToken, authorizeRoles('admin', 'staff'), eventController.updateEvent);
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'staff'), eventController.deleteEvent);
router.post('/:id/status', authenticateToken, authorizeRoles('admin', 'staff'), eventController.updateEventStatus);
router.get('/:id/timeline', authenticateToken, eventController.getEventTimeline);

module.exports = router;