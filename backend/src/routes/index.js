const express = require('express');
const router = express.Router();

// Import controllers
const exampleController = require('../controllers/index');

// Define routes
router.get('/example', exampleController.exampleFunction);

// Export the router
module.exports = router;