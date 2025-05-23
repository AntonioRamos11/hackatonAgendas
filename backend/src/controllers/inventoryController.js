const { sequelize } = require('../config/database');
const Inventory = require('../models/Inventory');
const { Op } = require('sequelize');

// Get all inventory items
exports.getInventory = async (req, res) => {
  try {
    const { category, available } = req.query;
    let where = {};
    
    if (category) where.category = category;
    if (available === 'true') where.available = { [Op.gt]: 0 };
    
    const inventory = await Inventory.findAll({ where });
    
    res.status(200).json({
      status: 'success',
      message: 'Inventory items retrieved successfully',
      data: inventory
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving inventory items',
      data: null,
      errors: [error.message]
    });
  }
};

// Update inventory quantities
exports.updateInventory = async (req, res) => {
  try {
    const { itemId, quantityChange, reason } = req.body;
    
    const item = await Inventory.findByPk(itemId);
    
    if (!item) {
      return res.status(404).json({
        status: 'error',
        message: 'Inventory item not found',
        data: null,
        errors: ['Inventory item does not exist']
      });
    }
    
    // Update quantity and available
    const newQuantity = item.quantity + parseInt(quantityChange);
    const newAvailable = item.available + parseInt(quantityChange);
    
    await item.update({ 
      quantity: newQuantity,
      available: newAvailable < 0 ? 0 : newAvailable
    });
    
    res.status(200).json({
      status: 'success',
      message: 'Inventory updated successfully',
      data: item
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Error updating inventory',
      data: null,
      errors: [error.message]
    });
  }
};

// Check availability for date range
exports.checkAvailability = async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    
    if (!start_date || !end_date) {
      return res.status(400).json({
        status: 'error',
        message: 'Start date and end date are required',
        data: null,
        errors: ['Missing date parameters']
      });
    }
    
    // Get all inventory items
    const inventory = await Inventory.findAll({
      where: {
        available: { [Op.gt]: 0 }
      }
    });
    
    // In a real app, you would check bookings for the date range
    // and calculate actual availability
    
    res.status(200).json({
      status: 'success',
      message: 'Availability retrieved successfully',
      data: {
        dateRange: { start: start_date, end: end_date },
        items: inventory
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error checking availability',
      data: null,
      errors: [error.message]
    });
  }
};

// Create inventory item
exports.createInventoryItem = async (req, res) => {
  try {
    const { name, category, quantity, unitCost, description } = req.body;
    
    const item = await Inventory.create({
      name,
      category,
      quantity,
      available: quantity, // Initially all items are available
      unitCost,
      description
    });
    
    res.status(201).json({
      status: 'success',
      message: 'Inventory item created successfully',
      data: item
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Error creating inventory item',
      data: null,
      errors: [error.message]
    });
  }
};

// Get inventory item by ID
exports.getInventoryItemById = async (req, res) => {
  try {
    const inventory = await Inventory.findByPk(req.params.id);
    
    if (!inventory) {
      return res.status(404).json({
        status: 'error',
        message: 'Inventory item not found',
        data: null,
        errors: ['Item does not exist']
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Inventory item retrieved successfully',
      data: inventory
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving inventory item',
      data: null,
      errors: [error.message]
    });
  }
};

// Get inventory categories
exports.getInventoryCategories = async (req, res) => {
  try {
    // Get distinct categories from inventory items
    const categories = await Inventory.findAll({
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('category')), 'category']],
      raw: true
    });
    
    const categoryList = categories.map(c => c.category);
    
    res.status(200).json({
      status: 'success',
      message: 'Inventory categories retrieved successfully',
      data: categoryList
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving inventory categories',
      data: null,
      errors: [error.message]
    });
  }
};

// Update inventory item details
exports.updateInventoryItem = async (req, res) => {
  try {
    const { name, category, description, unitCost } = req.body;
    const inventory = await Inventory.findByPk(req.params.id);
    
    if (!inventory) {
      return res.status(404).json({
        status: 'error',
        message: 'Inventory item not found',
        data: null,
        errors: ['Item does not exist']
      });
    }
    
    // Update fields that are provided
    if (name) inventory.name = name;
    if (category) inventory.category = category;
    if (description) inventory.description = description;
    if (unitCost) inventory.unitCost = unitCost;
    
    await inventory.save();
    
    res.status(200).json({
      status: 'success',
      message: 'Inventory item updated successfully',
      data: inventory
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Error updating inventory item',
      data: null,
      errors: [error.message]
    });
  }
};

// Delete inventory item
exports.deleteInventoryItem = async (req, res) => {
  try {
    const inventory = await Inventory.findByPk(req.params.id);
    
    if (!inventory) {
      return res.status(404).json({
        status: 'error',
        message: 'Inventory item not found',
        data: null,
        errors: ['Item does not exist']
      });
    }
    
    await inventory.destroy();
    
    res.status(200).json({
      status: 'success',
      message: 'Inventory item deleted successfully',
      data: null
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error deleting inventory item',
      data: null,
      errors: [error.message]
    });
  }
};