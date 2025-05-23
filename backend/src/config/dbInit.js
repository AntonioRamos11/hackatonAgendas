const { sequelize } = require('./database');

// Import models in order of dependency
const User = require('../models/User');
const Event = require('../models/Event');
const Inventory = require('../models/Inventory');
const { Quote, QuoteItem, QuoteService } = require('../models/Quote');
const { Invoice, Payment } = require('../models/Invoice');
const StaffAssignment = require('../models/StaffAssignment');
const { Notification } = require('../models/Notification');

// Set up associations after all models are defined
const setupAssociations = () => {
  console.log('Setting up associations...');
  
  // User associations
  User.hasMany(Event, { foreignKey: 'clientId', as: 'events' });
  
  // Event associations
  Event.belongsTo(User, { foreignKey: 'clientId', as: 'eventClient' });
  
  console.log('Setting up Quote associations...');
  // Quote associations
  Quote.belongsTo(User, { as: 'quoteClient', foreignKey: 'clientId' });
  Quote.belongsTo(Event, { foreignKey: 'eventId', as: 'event' });
  Quote.hasMany(QuoteItem, { foreignKey: 'quoteId', as: 'quoteItems', onDelete: 'CASCADE' });
  Quote.hasMany(QuoteService, { foreignKey: 'quoteId', as: 'quoteServices', onDelete: 'CASCADE' });
  
  // QuoteItem associations
  QuoteItem.belongsTo(Quote, { foreignKey: 'quoteId', as: 'parentQuote' });
  QuoteItem.belongsTo(Inventory, { foreignKey: 'inventoryId', as: 'inventory' });
  
  // QuoteService associations
  QuoteService.belongsTo(Quote, { foreignKey: 'quoteId', as: 'serviceQuote' });
  
  // Invoice associations
  Invoice.belongsTo(Quote, { foreignKey: 'quoteId', as: 'associatedQuote' });
  Invoice.belongsTo(User, { as: 'invoiceClient', foreignKey: 'clientId' });
  Invoice.belongsTo(Event, { foreignKey: 'eventId', as: 'invoiceEvent' });
  Invoice.hasMany(Payment, { as: 'invoicePayments', foreignKey: 'invoiceId', onDelete: 'CASCADE' });
  
  // Payment associations
  Payment.belongsTo(Invoice, { foreignKey: 'invoiceId', as: 'invoice' });
  
  // StaffAssignment associations
  StaffAssignment.belongsTo(User, { foreignKey: 'staffId', as: 'staff' });
  StaffAssignment.belongsTo(Event, { foreignKey: 'eventId', as: 'assignedEvent' });
  User.hasMany(StaffAssignment, { foreignKey: 'staffId', as: 'staffAssignments' });
  Event.hasMany(StaffAssignment, { foreignKey: 'eventId', as: 'eventStaffAssignments' });
  
  // Notification associations
  Notification.belongsTo(User, { foreignKey: 'userId', as: 'notificationUser' });
  User.hasMany(Notification, { foreignKey: 'userId', as: 'userNotifications' });
};

// Initialize database
const initDb = async (forceSync = false) => {
  try {
    // Get raw access to database to fix issues
    const [results] = await sequelize.query(
      "UPDATE \"Events\" SET \"clientId\" = NULL WHERE \"clientId\" = '3cdc7922-219e-4555-bc32-84a5d19e7845';"
    );
    console.log("Fixed invalid clientId references:", results);
    
    // Then continue with normal setup
    setupAssociations();
    
    // Sync models with database
    await sequelize.sync({ force: forceSync, alter: !forceSync });
    console.log('Database synchronized successfully');
    
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    return false;
  }
};

module.exports = {
  initDb,
  setupAssociations
};