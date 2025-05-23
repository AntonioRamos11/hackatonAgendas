const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const clientController = require('../controllers/clientController');

// Client routes
router.get('/', authenticateToken, authorizeRoles('admin', 'staff'), clientController.getClients);
router.post('/', authenticateToken, authorizeRoles('admin', 'staff'), clientController.addClient);
router.get('/:id', authenticateToken, authorizeRoles('admin', 'staff'), clientController.getClientById);
router.put('/:id', authenticateToken, authorizeRoles('admin', 'staff'), clientController.updateClient);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), clientController.deleteClient);
router.get('/:id/events', authenticateToken, clientController.getClientEvents);

module.exports = router;