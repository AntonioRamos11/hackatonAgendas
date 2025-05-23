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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to the database
connectToDatabase();

// Sync all models with the database
sequelize.sync({ alter: true })  // Use { force: true } to drop tables and recreate
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

// Set up routes
app.use('/api', routes);

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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app; // For testing