const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/index');
const { connectToDatabase, sequelize } = require('./config/database');
require('dotenv').config();

// Import models
const Event = require('./models/Event');
const Quote = require('./models/Quote').Quote;
const Notification = require('./models/Notification').Notification;
const Invoice = require('./models/Invoice').Invoice;

// Setup associations
require('./models/Event').setupAssociations();
if (require('./models/Quote').setupAssociations) {
  require('./models/Quote').setupAssociations();
}
if (require('./models/Invoice').setupAssociations) {
  require('./models/Invoice').setupAssociations();
}
if (require('./models/Notification').setupAssociations) {
  require('./models/Notification').setupAssociations();
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json({
  // Return a 400 error for JSON parsing failures rather than crashing
  verify: (req, res, buf, encoding) => {
    try {
      JSON.parse(buf);
    } catch (e) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid JSON payload',
        errors: [e.message]
      });
      throw new Error('Invalid JSON');
    }
  }
}));
app.use(bodyParser.urlencoded({ extended: true }));

// Add this middleware after your body-parser setup

// Error handler for JSON parsing failures
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid JSON in request body',
      errors: [err.message]
    });
  }
  next(err);
});

// Connect to the database
connectToDatabase();

// Initialize database without forcing recreation of tables
const { initDb } = require('./config/dbInit');

initDb(false)
  .then(success => {
    if (success) {
      console.log('Database initialization completed successfully');
    } else {
      console.error('Database initialization failed');
    }
  })
  .catch(err => {
    console.error('Unexpected error during database initialization:', err);
  });

// Set up routes
app.use('/api', routes);

// Add these imports
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const clientRoutes = require('./routes/clientRoutes');
const staffRoutes = require('./routes/staffRoutes');
const quoteRoutes = require('./routes/quoteRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

// Mount all routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/events', eventRoutes);
app.use('/api/v1/inventory', inventoryRoutes);
app.use('/api/v1/clients', clientRoutes);
app.use('/api/v1/staff', staffRoutes);
app.use('/api/v1/quotes', quoteRoutes);
app.use('/api/v1/notifications', notificationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    data: null,
    errors: [err.message]
  });
});

// Add an error handler for body-parser errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid JSON payload',
      errors: [err.message]
    });
  }
  next(err);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app; // For testing