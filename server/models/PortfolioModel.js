const mongoose = require('mongoose');

const PortfolioSchema = mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  coinId:Number,
  coinName: String,
  totalCoinValue: Number,
  totalCoinQuantity: Number,
  transactions:[{ type: mongoose.Schema.ObjectId, ref: 'PortfolioTransaction'}]
});

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);

module.exports = Portfolio;
