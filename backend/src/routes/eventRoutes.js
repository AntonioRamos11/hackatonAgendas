const express = require('express');
const router = express.Router();
const { 
  getEvents, 
  getEventById, 
  createEvent, 
  updateEvent,
  getEventTimeline
} = require('../controllers/eventController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Event routes
router.get('/', authenticateToken, getEvents);
router.get('/:id', authenticateToken, getEventById);
router.post('/', authenticateToken, authorizeRoles('admin', 'staff'), createEvent);
router.put('/:id', authenticateToken, authorizeRoles('admin', 'staff'), updateEvent);
router.get('/:id/timeline', authenticateToken, getEventTimeline);

module.exports = router;