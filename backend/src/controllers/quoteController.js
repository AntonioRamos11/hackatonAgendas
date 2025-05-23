const { sequelize } = require('../config/database');
const Quote = require('../models/Quote');
const QuoteItem = require('../models/QuoteItem');
const User = require('../models/User');
const Event = require('../models/Event');
const Inventory = require('../models/Inventory');
const { Invoice } = require('../models/Invoice');

// Get all quotes
exports.getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.findAll({
      include: [
        {
          model: User,
          as: 'client',
          attributes: ['id', 'name', 'email']
        },
        {
          model: Event,
          attributes: ['id', 'name', 'date']
        },
        {
          model: QuoteItem,
          as: 'items'
        }
      ]
    });
    
    res.status(200).json({
      status: 'success',
      message: 'Quotes retrieved successfully',
      data: quotes
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving quotes',
      data: null,
      errors: [error.message]
    });
  }
};

// Create a new quote
exports.createQuote = async (req, res) => {
  try {
    const { clientId, eventId, name, items, notes } = req.body;
    
    // Create the quote
    const quote = await Quote.create({
      clientId,
      eventId,
      name,
      status: 'pending',
      notes
    });
    
    // Create quote items if provided
    if (items && items.length > 0) {
      const quoteItems = items.map(item => ({
        ...item,
        quoteId: quote.id
      }));
      
      await QuoteItem.bulkCreate(quoteItems);
    }
    
    // Get the complete quote with items
    const completeQuote = await Quote.findByPk(quote.id, {
      include: [
        {
          model: QuoteItem,
          as: 'items'
        }
      ]
    });
    
    res.status(201).json({
      status: 'success',
      message: 'Quote created successfully',
      data: completeQuote
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Error creating quote',
      data: null,
      errors: [error.message]
    });
  }
};

// Get quote by ID
exports.getQuoteById = async (req, res) => {
  try {
    const quoteId = req.params.id;
    
    const quote = await Quote.findByPk(quoteId, {
      include: [
        {
          model: User,
          as: 'client',
          attributes: ['id', 'name', 'email']
        },
        {
          model: Event,
          attributes: ['id', 'name', 'date']
        },
        {
          model: QuoteItem,
          as: 'items'
        }
      ]
    });
    
    if (!quote) {
      return res.status(404).json({
        status: 'error',
        message: 'Quote not found',
        data: null,
        errors: ['Quote does not exist']
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Quote retrieved successfully',
      data: quote
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving quote',
      data: null,
      errors: [error.message]
    });
  }
};

// Update quote
exports.updateQuote = async (req, res) => {
  try {
    const quoteId = req.params.id;
    const { name, items, notes, status } = req.body;
    
    const quote = await Quote.findByPk(quoteId);
    
    if (!quote) {
      return res.status(404).json({
        status: 'error',
        message: 'Quote not found',
        data: null,
        errors: ['Quote does not exist']
      });
    }
    
    // Update quote fields
    if (name) quote.name = name;
    if (notes) quote.notes = notes;
    if (status) quote.status = status;
    
    await quote.save();
    
    // Update items if provided
    if (items && items.length > 0) {
      // Delete existing items
      await QuoteItem.destroy({ where: { quoteId } });
      
      // Create new items
      const quoteItems = items.map(item => ({
        ...item,
        quoteId
      }));
      
      await QuoteItem.bulkCreate(quoteItems);
    }
    
    // Get the updated quote with items
    const updatedQuote = await Quote.findByPk(quoteId, {
      include: [
        {
          model: QuoteItem,
          as: 'items'
        }
      ]
    });
    
    res.status(200).json({
      status: 'success',
      message: 'Quote updated successfully',
      data: updatedQuote
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Error updating quote',
      data: null,
      errors: [error.message]
    });
  }
};

// Delete quote
exports.deleteQuote = async (req, res) => {
  try {
    const quoteId = req.params.id;
    
    const quote = await Quote.findByPk(quoteId);
    
    if (!quote) {
      return res.status(404).json({
        status: 'error',
        message: 'Quote not found',
        data: null,
        errors: ['Quote does not exist']
      });
    }
    
    // Delete related items first
    await QuoteItem.destroy({ where: { quoteId } });
    
    // Delete the quote
    await quote.destroy();
    
    res.status(200).json({
      status: 'success',
      message: 'Quote deleted successfully',
      data: null
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error deleting quote',
      data: null,
      errors: [error.message]
    });
  }
};

// Approve quote
exports.approveQuote = async (req, res) => {
  try {
    const quoteId = req.params.id;
    
    const quote = await Quote.findByPk(quoteId);
    
    if (!quote) {
      return res.status(404).json({
        status: 'error',
        message: 'Quote not found',
        data: null,
        errors: ['Quote does not exist']
      });
    }
    
    quote.status = 'approved';
    quote.approvedAt = new Date();
    
    await quote.save();
    
    res.status(200).json({
      status: 'success',
      message: 'Quote approved successfully',
      data: quote
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error approving quote',
      data: null,
      errors: [error.message]
    });
  }
};