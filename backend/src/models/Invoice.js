const { DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize;

const Invoice = sequelize.define('Invoice', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  quoteId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Quotes',
      key: 'id'
    }
  },
  clientId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  eventId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Events',
      key: 'id'
    }
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'paid', 'partial', 'cancelled'),
    defaultValue: 'pending'
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  notes: {
    type: DataTypes.TEXT
  }
});

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  invoiceId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Invoices',
      key: 'id'
    }
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  method: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reference: {
    type: DataTypes.STRING
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  notes: {
    type: DataTypes.TEXT
  }
});

// Define relationships
Payment.belongsTo(Invoice, { foreignKey: 'invoiceId' });
Invoice.hasMany(Payment, { as: 'payments', foreignKey: 'invoiceId' });

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
  Payment,
  setupAssociations
};