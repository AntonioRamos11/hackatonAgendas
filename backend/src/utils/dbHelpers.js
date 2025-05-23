const { sequelize } = require('../config/database');

/**
 * Execute database operations within a transaction
 * @param {Function} callback - Function that performs DB operations
 */
exports.withTransaction = async (callback) => {
  const transaction = await sequelize.transaction();
  try {
    await callback(transaction);
    await transaction.commit();
    return true;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};