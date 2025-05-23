const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const inventoryController = require('../controllers/inventoryController');

// Inventory routes
router.get('/', authenticateToken, inventoryController.getInventory);
router.post('/', authenticateToken, authorizeRoles('admin', 'staff'), inventoryController.createInventoryItem);
router.get('/categories', authenticateToken, inventoryController.getInventoryCategories);
router.get('/availability', authenticateToken, inventoryController.checkAvailability);
router.post('/update', authenticateToken, authorizeRoles('admin', 'staff'), inventoryController.updateInventory);
router.get('/:id', authenticateToken, inventoryController.getInventoryItemById);
router.put('/:id', authenticateToken, authorizeRoles('admin', 'staff'), inventoryController.updateInventoryItem);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), inventoryController.deleteInventoryItem);

module.exports = router;