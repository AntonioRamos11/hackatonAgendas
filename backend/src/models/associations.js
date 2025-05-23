// Add these lines to your associations file or create it if it doesn't exist

const Quote = require('./Quote');
const QuoteItem = require('./QuoteItem');
const User = require('./User');
const Event = require('./Event');
const { Invoice, Payment } = require('./Invoice');

// Quote associations
Quote.belongsTo(User, { as: 'client', foreignKey: 'clientId' });
Quote.belongsTo(Event, { foreignKey: 'eventId' });
Quote.hasMany(QuoteItem, { as: 'items', foreignKey: 'quoteId' });

// QuoteItem associations
QuoteItem.belongsTo(Quote, { foreignKey: 'quoteId' });

// Invoice associations
Invoice.belongsTo(Quote, { foreignKey: 'quoteId' });
Invoice.belongsTo(User, { as: 'client', foreignKey: 'clientId' });
Invoice.belongsTo(Event, { foreignKey: 'eventId' });

module.exports = {
  setupAssociations: () => {
    console.log('Associations established');
  }
};