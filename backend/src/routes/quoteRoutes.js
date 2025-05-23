const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const quoteController = require('../controllers/quoteController');

// Quote routes
router.get('/', authenticateToken, authorizeRoles('admin', 'staff'), quoteController.getQuotes);
router.post('/', authenticateToken, authorizeRoles('admin', 'staff'), quoteController.createQuote);
router.get('/:id', authenticateToken, quoteController.getQuoteById);
router.put('/:id', authenticateToken, authorizeRoles('admin', 'staff'), quoteController.updateQuote);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), quoteController.deleteQuote);
router.post('/:id/approve', authenticateToken, quoteController.approveQuote);

module.exports = router;