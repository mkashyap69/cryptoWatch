const mongoose = require('mongoose');

const PortfolioTransactionSchema = mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  coinId:Number,
  coinName: String,
  coinPrice: Number,
  coinQuantity: Number,
  total: Number,
  transactionDate: String,
  transactionType: String,
});

const PortfolioTransaction = mongoose.model('PortfolioTransaction', PortfolioTransactionSchema);

module.exports = PortfolioTransaction;
