const { Invoice } = require('../models/Invoice');
const { Quote } = require('../models/Quote');
const User = require('../models/User');
const Event = require('../models/Event');

// Get invoice by ID
exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id, {
      include: [
        { model: User, as: 'client', attributes: ['id', 'name', 'email'] },
        { model: Event, attributes: ['id', 'name', 'date'] },
        { model: Quote, as: 'quote' }
      ]
    });
    
    if (!invoice) {
      return res.status(404).json({
        status: 'error',
        message: 'Invoice not found',
        data: null,
        errors: ['Invoice does not exist']
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Invoice retrieved successfully',
      data: invoice
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving invoice',
      data: null,
      errors: [error.message]
    });
  }
};