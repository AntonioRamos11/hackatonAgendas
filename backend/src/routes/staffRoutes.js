const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const staffController = require('../controllers/staffController');

// Staff routes
router.get('/', authenticateToken, authorizeRoles('admin'), staffController.getStaff);
router.post('/', authenticateToken, authorizeRoles('admin'), staffController.createStaff);
router.get('/:id', authenticateToken, authorizeRoles('admin', 'staff'), staffController.getStaffById);
router.put('/:id', authenticateToken, authorizeRoles('admin'), staffController.updateStaff);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), staffController.deleteStaff);
router.post('/assignments', authenticateToken, authorizeRoles('admin', 'staff'), staffController.assignStaff);
router.delete('/assignments/:id', authenticateToken, authorizeRoles('admin', 'staff'), staffController.unassignStaff);
router.get('/:id/schedule', authenticateToken, staffController.getStaffSchedule);

module.exports = router;