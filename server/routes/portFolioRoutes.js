const express = require('express');

const { protect } = require('../controller/authController');
const clearCache = require('../middleware/clearCache');

const {
  addToPortfolioTransaction,
  getPortfolioTransaction,
  getPortfolioTransactionByCoinName,
  getPortfolioCoinNames,
} = require('../controller/portfolioController');

const Router = express.Router();

Router.route('/')
  .get(protect, getPortfolioTransaction)
  .post(protect, clearCache, addToPortfolioTransaction);

Router.route('/uniqueCoinName').get(protect, getPortfolioCoinNames);
Router.route('/transactions/:coinName').get(
  protect,
  getPortfolioTransactionByCoinName
);

module.exports = Router;
