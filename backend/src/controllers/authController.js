const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// Register a new user
exports.register = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'User already exists',
        data: null,
        errors: ['Email already in use']
      });
    }
    
    // Create new user
    const user = await User.create({ email, password, name, role });
    
    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: { user_id: user.id, token }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error registering user',
      data: null,
      errors: [error.message]
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication failed',
        data: null,
        errors: ['Invalid email or password']
      });
    }
    
    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication failed',
        data: null,
        errors: ['Invalid email or password']
      });
    }
    
    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '24h' }
    );
    
    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: { user_id: user.id, token, role: user.role }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error during login',
      data: null,
      errors: [error.message]
    });
  }
};

// Get current user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
        data: null,
        errors: ['User does not exist']
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'User profile retrieved',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving profile',
      data: null,
      errors: [error.message]
    });
  }
};