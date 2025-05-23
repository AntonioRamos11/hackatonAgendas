const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Notification model
const Notification = sequelize.define('Notification', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  type: {
    type: DataTypes.ENUM('system', 'event', 'quote', 'invoice', 'staff'),
    defaultValue: 'system'
  }
}, {
  timestamps: true
});

// Device model for push notifications
const Device = sequelize.define('Device', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  deviceToken: {
    type: DataTypes.STRING,
    allowNull: false
  },
  platform: {
    type: DataTypes.ENUM('android', 'web'),
    allowNull: false
  }
}, {
  timestamps: true,
  indexes: [
    { fields: ['deviceToken'], unique: true },
    { fields: ['userId', 'platform'] }
  ]
});

// Set up associations
const setupAssociations = () => {
  const User = require('./User');

  // Notification belongs to User
  Notification.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  User.hasMany(Notification, { foreignKey: 'userId', as: 'notifications' });
  
  // Device belongs to User
  Device.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  User.hasMany(Device, { foreignKey: 'userId', as: 'devices' });
};

module.exports = {
  Notification,
  Device,
  setupAssociations
};