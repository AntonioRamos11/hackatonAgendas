const User = require('../models/User');
const Event = require('../models/Event');

// Get all clients
exports.getClients = async (req, res) => {
  try {
    const clients = await User.findAll({
      where: { role: 'client' },
      attributes: [
        'id', 
        'name', 
        'email', 
        'phone',       // Changed from 'phoneNumber' to 'phone'
        'company', 
        'position',
        'notes',
        'createdAt'
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      status: 'success',
      message: 'Clients retrieved successfully',
      data: clients
    });
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving clients',
      data: null,
      errors: [error.message]
    });
  }
};

// Add new client
exports.addClient = async (req, res) => {
  try {
    // Ensure the role is set to 'client'
    req.body.role = 'client';
    
    const client = await User.create(req.body);
    
    res.status(201).json({
      status: 'success',
      message: 'Client added successfully',
      data: client
    });
  } catch (error) {
    // Check specifically for unique constraint violation
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        status: 'error',
        message: 'Email already in use',
        data: null,
        errors: ['A user with this email already exists']
      });
    }
    
    res.status(400).json({
      status: 'error',
      message: 'Error adding client',
      data: null,
      errors: [error.message]
    });
  }
};

// Update the getClientEvents method to allow admin users to view any user's events
exports.getClientEvents = async (req, res) => {
  try {
    const clientId = req.params.id;
    
    // Check if user exists without checking their role
    const user = await User.findByPk(clientId);
    
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
        data: null,
        errors: ['User does not exist']
      });
    }
    
    // Get events for the user
    const events = await Event.findAll({
      where: { clientId },
      attributes: ['id', 'name', 'date', 'status', 'location']
    });
    
    res.status(200).json({
      status: 'success',
      message: 'User events retrieved successfully',
      data: events
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving user events',
      data: null,
      errors: [error.message]
    });
  }
};

// Get client by ID
exports.getClientById = async (req, res) => {
  try {
    const clientId = req.params.id;
    
    const client = await User.findOne({
      where: { 
        id: clientId,
        role: 'client'
      },
      attributes: { exclude: ['password'] }
    });
    
    if (!client) {
      return res.status(404).json({
        status: 'error',
        message: 'Client not found',
        data: null,
        errors: ['Client does not exist']
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Client retrieved successfully',
      data: client
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving client',
      data: null,
      errors: [error.message]
    });
  }
};

// Update an existing client
exports.updateClient = async (req, res) => {
  try {
    const clientId = req.params.id;
    const { name, email, phone, company, notes } = req.body;
    
    const client = await User.findOne({
      where: {
        id: clientId,
        role: 'client'
      }
    });
    
    if (!client) {
      return res.status(404).json({
        status: 'error',
        message: 'Client not found',
        data: null,
        errors: ['Client does not exist']
      });
    }
    
    // Update client fields
    if (name) client.name = name;
    if (email) client.email = email;
    if (phone) client.phone = phone;
    if (company) client.company = company;
    if (notes) client.notes = notes;
    
    await client.save();
    
    // Remove password from response
    const clientData = client.toJSON();
    delete clientData.password;
    
    res.status(200).json({
      status: 'success',
      message: 'Client updated successfully',
      data: clientData
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error updating client',
      data: null,
      errors: [error.message]
    });
  }
};

// Delete a client
exports.deleteClient = async (req, res) => {
  try {
    const clientId = req.params.id;
    
    const client = await User.findOne({
      where: {
        id: clientId,
        role: 'client'
      }
    });
    
    if (!client) {
      return res.status(404).json({
        status: 'error',
        message: 'Client not found',
        data: null,
        errors: ['Client does not exist']
      });
    }
    
    await client.destroy();
    
    res.status(200).json({
      status: 'success',
      message: 'Client deleted successfully',
      data: null
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error deleting client',
      data: null,
      errors: [error.message]
    });
  }
};