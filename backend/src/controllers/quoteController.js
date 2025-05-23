const { Quote, QuoteItem, QuoteService } = require('../models/Quote');
const User = require('../models/User');
const Inventory = require('../models/Inventory');
const { Event } = require('../models/Event');
const { Invoice } = require('../models/Invoice');

// Create quote
exports.createQuote = async (req, res) => {
  try {
    const { clientId, eventDetails, items, services } = req.body;
    
    // Check if client exists
    const client = await User.findByPk(clientId);
    if (!client) {
      return res.status(404).json({
        status: 'error',
        message: 'Client not found',
        data: null,
        errors: ['Client does not exist']
      });
    }
    
    // Calculate subtotal from items and services
    let subtotal = 0;
    
    // Create quote
    const quote = await Quote.create({
      clientId,
      eventName: eventDetails.name,
      eventDate: eventDetails.date,
      eventLocation: eventDetails.location,
      guestCount: eventDetails.guestCount,
      subtotal,
      total: subtotal, // You would add tax calculation here
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Valid for 30 days
    });
    
    // Create quote items
    if (items && items.length > 0) {
      for (const item of items) {
        const inventoryItem = await Inventory.findByPk(item.inventoryId);
        if (inventoryItem) {
          await QuoteItem.create({
            quoteId: quote.id,
            inventoryId: item.inventoryId,
            quantity: item.quantity,
            unitPrice: inventoryItem.unitCost,
            total: inventoryItem.unitCost * item.quantity
          });
          
          // Add item total to quote subtotal
          subtotal += inventoryItem.unitCost * item.quantity;
        }
      }
    }
    
    // Create quote services
    if (services && services.length > 0) {
      for (const service of services) {
        await QuoteService.create({
          quoteId: quote.id,
          name: service.name,
          description: service.description,
          price: service.price
        });
        
        // Add service price to quote subtotal
        subtotal += service.price;
      }
    }
    
    // Update quote with calculated subtotal and total
    const tax = subtotal * 0.1; // 10% tax for example
    await quote.update({
      subtotal,
      tax,
      total: subtotal + tax
    });
    
    // Get the quote with all related data
    const completeQuote = await Quote.findByPk(quote.id, {
      include: [
        { model: QuoteItem, as: 'items', include: [{ model: Inventory, as: 'item' }] },
        { model: QuoteService, as: 'services' }
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
    const quote = await Quote.findByPk(req.params.id, {
      include: [
        { model: User, as: 'client', attributes: ['id', 'name', 'email'] },
        { model: QuoteItem, as: 'items', include: [{ model: Inventory, as: 'item' }] },
        { model: QuoteService, as: 'services' }
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
    
    // Update quote status
    await quote.update({ 
      status: 'approved',
      approvedAt: new Date()
    });
    
    // Create event from quote
    const event = await Event.create({
      name: quote.eventName,
      date: quote.eventDate,
      endDate: new Date(new Date(quote.eventDate).getTime() + 4 * 60 * 60 * 1000), // Default 4 hours
      location: quote.eventLocation,
      clientId: quote.clientId,
      guestCount: quote.guestCount,
      budget: quote.total,
      status: 'confirmed'
    });
    
    // Create invoice
    const invoice = await Invoice.create({
      quoteId: quote.id,
      clientId: quote.clientId,
      eventId: event.id,
      amount: quote.total,
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // Due in 15 days
      status: 'pending'
    });
    
    res.status(200).json({
      status: 'success',
      message: 'Quote approved successfully',
      data: { 
        quote,
        event,
        invoice
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Error approving quote',
      data: null,
      errors: [error.message]
    });
  }
};