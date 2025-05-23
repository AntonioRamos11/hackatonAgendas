const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Invoice = sequelize.define('Invoice', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  quoteId: {
    type: DataTypes.UUID,
    allowNull: true  // Can be null if created without a quote
  },
  clientId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  eventId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
    validate: {
      isIn: [['pending', 'paid', 'overdue', 'canceled']]
    }
  },
  paymentMethod: DataTypes.STRING,
  paymentDate: DataTypes.DATE,
  notes: DataTypes.TEXT
}, {
  timestamps: true
});

// Fix the setupAssociations function to avoid circular dependencies
const setupAssociations = () => {
  // Import models here to avoid circular dependencies
  const User = require('./User');
  const Event = require('./Event');
  const { Quote } = require('./Quote');
  
  // Make sure all models are defined before creating associations
  if (User && Quote && Event) {
    // Invoice belongs to User (client)
    Invoice.belongsTo(User, { foreignKey: 'clientId', as: 'client' });
    
    // Invoice belongs to Event
    Invoice.belongsTo(Event, { foreignKey: 'eventId', as: 'event' });
    
    // Invoice belongs to Quote (if created from a quote)
    Invoice.belongsTo(Quote, { foreignKey: 'quoteId', as: 'quote' });
  }
};

module.exports = {
  Invoice,
  setupAssociations
};