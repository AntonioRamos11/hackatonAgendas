const { sequelize } = require('../config/database');
const { Invoice, Payment } = require('../models/Invoice');
const { Quote } = require('../models/Quote');
const User = require('../models/User');
const Event = require('../models/Event');

// Create a new invoice
exports.createInvoice = async (req, res) => {
  try {
    const { quoteId, clientId, eventId, amount, dueDate, notes } = req.body;
    
    // Create the invoice
    const invoice = await Invoice.create({
      quoteId,
      clientId,
      eventId,
      amount,
      dueDate,
      status: 'pending',
      notes
    });
    
    // Get complete invoice with associations
    const completeInvoice = await Invoice.findByPk(invoice.id, {
      include: [
        {
          model: User,
          as: 'invoiceClient',
          attributes: ['id', 'name', 'email', 'phone']
        },
        {
          model: Event,
          as: 'invoiceEvent',
          attributes: ['id', 'name', 'date']
        },
        {
          model: Quote,
          as: 'associatedQuote',
          attributes: ['id', 'name', 'status']
        }
      ]
    });
    
    res.status(201).json({
      status: 'success',
      message: 'Invoice created successfully',
      data: completeInvoice
    });
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(400).json({
      status: 'error',
      message: 'Error creating invoice',
      data: null,
      errors: [error.message]
    });
  }
};

// Get all invoices
exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.findAll({
      include: [
        {
          model: User,
          as: 'invoiceClient',
          attributes: ['id', 'name', 'email', 'phone']
        },
        {
          model: Event,
          as: 'invoiceEvent',
          attributes: ['id', 'name', 'date']
        },
        {
          model: Quote,
          as: 'associatedQuote'
        },
        {
          model: Payment,
          as: 'invoicePayments'
        }
      ]
    });
    
    res.status(200).json({
      status: 'success',
      message: 'Invoices retrieved successfully',
      data: invoices
    });
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving invoices',
      data: null,
      errors: [error.message]
    });
  }
};

// Get invoice by ID
exports.getInvoiceById = async (req, res) => {
  try {
    const invoiceId = req.params.id;
    
    const invoice = await Invoice.findByPk(invoiceId, {
      include: [
        {
          model: User,
          as: 'invoiceClient',
          attributes: ['id', 'name', 'email', 'phone']
        },
        {
          model: Event,
          as: 'invoiceEvent',
          attributes: ['id', 'name', 'date']
        },
        {
          model: Quote,
          as: 'associatedQuote'
        },
        {
          model: Payment,
          as: 'invoicePayments'
        }
      ]
    });
    
    if (!invoice) {
      return res.status(404).json({
        status: 'error',
        message: 'Invoice not found',
        data: null
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Invoice retrieved successfully',
      data: invoice
    });
  } catch (error) {
    console.error('Error fetching invoice:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving invoice',
      data: null,
      errors: [error.message]
    });
  }
};

// Update invoice
exports.updateInvoice = async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const { amount, dueDate, notes, status } = req.body;
    
    const invoice = await Invoice.findByPk(invoiceId);
    
    if (!invoice) {
      return res.status(404).json({
        status: 'error',
        message: 'Invoice not found',
        data: null
      });
    }
    
    // Update invoice fields
    if (amount !== undefined) invoice.amount = amount;
    if (dueDate !== undefined) invoice.dueDate = dueDate;
    if (notes !== undefined) invoice.notes = notes;
    if (status !== undefined) invoice.status = status;
    
    await invoice.save();
    
    const updatedInvoice = await Invoice.findByPk(invoiceId, {
      include: [
        {
          model: User,
          as: 'invoiceClient'
        },
        {
          model: Quote,
          as: 'associatedQuote'
        },
        {
          model: Payment,
          as: 'invoicePayments'
        }
      ]
    });
    
    res.status(200).json({
      status: 'success',
      message: 'Invoice updated successfully',
      data: updatedInvoice
    });
  } catch (error) {
    console.error('Error updating invoice:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error updating invoice',
      data: null,
      errors: [error.message]
    });
  }
};

// Record payment for invoice
exports.recordPayment = async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const { amount, method, reference, notes } = req.body;
    
    const invoice = await Invoice.findByPk(invoiceId);
    if (!invoice) {
      return res.status(404).json({
        status: 'error',
        message: 'Invoice not found',
        data: null
      });
    }
    
    const payment = await Payment.create({
      invoiceId,
      amount,
      method,
      reference,
      notes
    });
    
    res.status(200).json({
      status: 'success',
      message: 'Payment recorded successfully',
      data: payment
    });
  } catch (error) {
    console.error('Error recording payment:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error recording payment',
      data: null,
      errors: [error.message]
    });
  }
};