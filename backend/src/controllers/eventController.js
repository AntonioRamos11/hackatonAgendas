const Event = require('../models/Event');
const User = require('../models/User');
const { Op } = require('sequelize');

// Get all events with filtering
exports.getEvents = async (req, res) => {
  try {
    const { status, client_id } = req.query;
    let where = {};
    
    if (status) where.status = status;
    if (client_id) where.clientId = client_id;
    
    if (status === 'upcoming') {
      where.date = { [Op.gte]: new Date() };
      delete where.status;
    }
    
    // Try getting events without associations if including them fails
    let events;
    try {
      events = await Event.findAll({
        where,
        include: [{ model: User, as: 'client', attributes: ['id', 'name', 'email'] }],
        attributes: ['id', 'name', 'date', 'status']
      });
    } catch (error) {
      console.warn('Falling back to query without associations:', error.message);
      events = await Event.findAll({
        where,
        attributes: ['id', 'name', 'date', 'status', 'clientId']
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Events retrieved successfully',
      data: events,
      pagination: {
        total: events.length,
        page: 1,
        per_page: events.length,
        total_pages: 1
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving events',
      data: null,
      errors: [error.message]
    });
  }
};

// Get event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      include: [
        { model: User, as: 'client', attributes: ['id', 'name', 'email', 'phoneNumber'] }
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

// Create event
exports.createEvent = async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    
    res.status(201).json({
      status: 'success',
      message: 'Event created successfully',
      data: newEvent
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: 'error',
      message: 'Error creating event',
      data: null,
      errors: [error.message]
    });
  }
};

// Update event
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found',
        data: null,
        errors: ['Event does not exist']
      });
    }
    
    await event.update(req.body);
    
    res.status(200).json({
      status: 'success',
      message: 'Event updated successfully',
      data: event
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Error updating event',
      data: null,
      errors: [error.message]
    });
  }
};

// Get event timeline
exports.getEventTimeline = async (req, res) => {
  try {
    // Implement this based on your Timeline model
    const event = await Event.findByPk(req.params.id, {
      attributes: ['id', 'name', 'date']
    });
    
    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found',
        data: null,
        errors: ['Event does not exist']
      });
    }
    
    // You'll need to implement a way to fetch timeline items
    // based on your database structure
    const timeline = []; // Placeholder
    
    res.status(200).json({
      status: 'success',
      message: 'Event timeline retrieved successfully',
      data: {
        event_id: event.id,
        name: event.name,
        date: event.date,
        timeline: timeline
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving event timeline',
      data: null,
      errors: [error.message]
    });
  }
};

// Add this method to your controller:

exports.deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findByPk(eventId);
    
    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found',
        data: null,
        errors: ['Event does not exist']
      });
    }
    
    await event.destroy();
    
    res.status(200).json({
      status: 'success',
      message: 'Event deleted successfully',
      data: null
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error deleting event',
      data: null,
      errors: [error.message]
    });
  }
};

// Also add this method for the status update endpoint:
exports.updateEventStatus = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({
        status: 'error',
        message: 'Status is required',
        data: null,
        errors: ['Status field is missing']
      });
    }
    
    const event = await Event.findByPk(eventId);
    
    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found',
        data: null,
        errors: ['Event does not exist']
      });
    }
    
    event.status = status;
    await event.save();
    
    res.status(200).json({
      status: 'success',
      message: 'Event status updated successfully',
      data: event
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error updating event status',
      data: null,
      errors: [error.message]
    });
  }
};