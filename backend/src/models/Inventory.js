const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Inventory = sequelize.define('Inventory', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  available: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  description: DataTypes.TEXT,
  unitCost: DataTypes.DECIMAL(10, 2),
  image: DataTypes.STRING
}, {
  timestamps: true // This automatically creates createdAt and updatedAt fields
});

module.exports = Inventory;