const express = require('express');
const router = express.Router();

// Import middleware
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Import controllers
const authController = require('../controllers/authController');
const eventController = require('../controllers/eventController');
delete require.cache[require.resolve('../controllers/clientController')];
const clientController = require('../controllers/clientController');
console.log('ClientController loaded:', Object.keys(clientController));
const staffController = require('../controllers/staffController');
const inventoryController = require('../controllers/inventoryController');
const quoteController = require('../controllers/quoteController');
const invoiceController = require('../controllers/invoiceController');
const notificationController = require('../controllers/notificationController');

// Auth routes
router.post('/v1/auth/register', authController.register);
router.post('/v1/auth/login', authController.login);
router.get('/v1/auth/me', authenticateToken, authController.getProfile);

// Event routes
router.get('/v1/events', authenticateToken, eventController.getEvents);
router.get('/v1/events/:id', authenticateToken, eventController.getEventById);
router.post('/v1/events', authenticateToken, authorizeRoles('admin', 'staff'), eventController.createEvent);
router.put('/v1/events/:id', authenticateToken, authorizeRoles('admin', 'staff'), eventController.updateEvent);
router.get('/v1/events/:id/timeline', authenticateToken, eventController.getEventTimeline);

// Client routes
router.get('/v1/clients', authenticateToken, authorizeRoles('admin', 'staff'), clientController.getClients);
router.post('/v1/clients', authenticateToken, authorizeRoles('admin', 'staff'), clientController.addClient);
router.get('/v1/clients/:id/events', authenticateToken, clientController.getClientEvents);
router.get('/v1/clients/:id', authenticateToken, authorizeRoles('admin', 'staff'), clientController.getClientById);

// Add this line right after your client routes
router.get('/v1/user-events/:id', authenticateToken, clientController.getClientEvents);

// Staff routes
router.get('/v1/staff', authenticateToken, authorizeRoles('admin'), staffController.getStaff);
router.post('/v1/staff/assignments', authenticateToken, authorizeRoles('admin', 'staff'), staffController.assignStaff);
router.get('/v1/staff/:id/schedule', authenticateToken, staffController.getStaffSchedule);

// Inventory routes
router.get('/v1/inventory', authenticateToken, inventoryController.getInventory);
router.post('/v1/inventory/update', authenticateToken, authorizeRoles('admin', 'staff'), inventoryController.updateInventory);
router.get('/v1/inventory/availability', authenticateToken, inventoryController.checkAvailability);
// Add this line to your inventory routes:
router.post('/v1/inventory', authenticateToken, authorizeRoles('admin', 'staff'), inventoryController.createInventoryItem);

// Quote routes
router.post('/v1/quotes', authenticateToken, authorizeRoles('admin', 'staff'), quoteController.createQuote);
router.get('/v1/quotes/:id', authenticateToken, quoteController.getQuoteById);
router.post('/v1/quotes/:id/approve', authenticateToken, quoteController.approveQuote);

// Invoice routes
router.get('/v1/invoices/:id', authenticateToken, invoiceController.getInvoiceById);

// Notification routes
router.post('/v1/notifications/register-device', authenticateToken, notificationController.registerDevice);
router.get('/v1/notifications', authenticateToken, notificationController.getNotifications);
router.put('/v1/notifications/:id/read', authenticateToken, notificationController.markAsRead);

module.exports = router;
