const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Define the Event model
const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  clientId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'in-progress', 'completed', 'cancelled'),
    defaultValue: 'pending'
  },
  description: DataTypes.TEXT,
  guestCount: DataTypes.INTEGER,
  budget: DataTypes.DECIMAL(10, 2),
  specialRequirements: DataTypes.TEXT
}, {
  timestamps: true // Creates createdAt and updatedAt automatically
});

// Define Timeline model for the nested timeline array
const Timeline = sequelize.define('Timeline', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  activity: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: DataTypes.TEXT,
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true
});

// Define StaffAssignment model for the nested assignedStaff array
const StaffAssignment = sequelize.define('StaffAssignment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  role: DataTypes.STRING
}, {
  timestamps: true
});

// Define EventInventory model for the nested inventoryItems array
const EventInventory = sequelize.define('EventInventory', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  timestamps: true
});

// Set up associations after all models are loaded
const setupAssociations = () => {
  // Event belongs to User (client)
  Event.belongsTo(require('./User'), { as: 'client', foreignKey: 'clientId' });
  
  // Event has many Timeline items
  Event.hasMany(Timeline, { as: 'timeline', foreignKey: 'eventId', onDelete: 'CASCADE' });
  Timeline.belongsTo(Event, { foreignKey: 'eventId' });
  
  // Event has many StaffAssignments
  Event.hasMany(StaffAssignment, { as: 'assignedStaff', foreignKey: 'eventId', onDelete: 'CASCADE' });
  StaffAssignment.belongsTo(Event, { foreignKey: 'eventId' });
  
  // StaffAssignment belongs to User (staff)
  StaffAssignment.belongsTo(require('./User'), { as: 'staff', foreignKey: 'staffId' });
  
  // Event has many EventInventory items
  Event.hasMany(EventInventory, { as: 'inventoryItems', foreignKey: 'eventId', onDelete: 'CASCADE' });
  EventInventory.belongsTo(Event, { foreignKey: 'eventId' });
  
  // EventInventory belongs to Inventory (item)
  EventInventory.belongsTo(require('./Inventory'), { as: 'item', foreignKey: 'inventoryId' });
};

module.exports = Event;
module.exports.Timeline = Timeline;
module.exports.StaffAssignment = StaffAssignment;
module.exports.EventInventory = EventInventory;
module.exports.setupAssociations = setupAssociations;

// In eventController.js
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      include: [
        { model: User, as: 'client', attributes: ['id', 'name', 'email', 'phoneNumber'] },
        { model: Timeline, as: 'timeline' },
        { 
          model: StaffAssignment, 
          as: 'assignedStaff',
          include: [{ model: User, as: 'staff', attributes: ['id', 'name', 'role'] }]
        },
        {
          model: EventInventory,
          as: 'inventoryItems',
          include: [{ model: Inventory, as: 'item', attributes: ['id', 'name', 'category'] }]
        }
      ]
    });
    
    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found',
        data: null,
        errors: ['Event does not exist']
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Event retrieved successfully',
      data: event
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving event',
      data: null,
      errors: [error.message]
    });
  }
};

module.exports = Event;
module.exports.setupAssociations = () => {
  const User = require('./User');
  
  // Create association between Event and User
  Event.belongsTo(User, { foreignKey: 'clientId', as: 'client' });
};