const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Main Quote model
const Quote = sequelize.define('Quote', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  clientId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  // Event details as columns in the main Quote table
  eventName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  eventDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  eventLocation: DataTypes.STRING,
  guestCount: DataTypes.INTEGER,
  
  // Financial information
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  tax: DataTypes.DECIMAL(10, 2),
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('draft', 'sent', 'approved', 'rejected'),
    defaultValue: 'draft'
  },
  validUntil: DataTypes.DATE,
  notes: DataTypes.TEXT,
  approvedAt: DataTypes.DATE
}, {
  timestamps: true
});

// QuoteItem model for the items array
const QuoteItem = sequelize.define('QuoteItem', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  quoteId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  inventoryId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  unitPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  timestamps: true
});

// QuoteService model for the services array
const QuoteService = sequelize.define('QuoteService', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  quoteId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: DataTypes.TEXT,
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  timestamps: true
});

// Set up associations
const setupAssociations = () => {
  const User = require('./User');
  const Inventory = require('./Inventory');

  // Quote belongs to User (client)
  Quote.belongsTo(User, { foreignKey: 'clientId', as: 'client' });
  
  // Quote has many QuoteItems
  Quote.hasMany(QuoteItem, { foreignKey: 'quoteId', as: 'items', onDelete: 'CASCADE' });
  QuoteItem.belongsTo(Quote, { foreignKey: 'quoteId' });
  
  // QuoteItem belongs to Inventory
  QuoteItem.belongsTo(Inventory, { foreignKey: 'inventoryId', as: 'item' });
  
  // Quote has many QuoteServices
  Quote.hasMany(QuoteService, { foreignKey: 'quoteId', as: 'services', onDelete: 'CASCADE' });
  QuoteService.belongsTo(Quote, { foreignKey: 'quoteId' });
};

module.exports = {
  Quote,
  QuoteItem,
  QuoteService,
  setupAssociations
};