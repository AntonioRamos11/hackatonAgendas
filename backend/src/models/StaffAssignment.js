const { DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize;
const User = require('./User');
const Event = require('./Event');

const StaffAssignment = sequelize.define('StaffAssignment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  staffId: {
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
  role: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Set up associations
StaffAssignment.belongsTo(User, { foreignKey: 'staffId' });
StaffAssignment.belongsTo(Event, { foreignKey: 'eventId' });

module.exports = StaffAssignment;