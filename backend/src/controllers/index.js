const express = require('express');
const router = express.Router();

// Example controller functions
const getExample = (req, res) => {
    res.send('GET example');
};

const postExample = (req, res) => {
    res.send('POST example');
};

// Define routes
router.get('/example', getExample);
router.post('/example', postExample);

// Export the router
module.exports = router;