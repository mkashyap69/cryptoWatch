const PortfolioTransaction = require('../models/PortfolioTransactionModel');

const addToPortfolioTransaction = async (req, res) => {
  try {
    const data = await PortfolioTransaction.create(req.body);

    res.status(200).json({
      status: 'Success',
      data,
    });
  } catch (err) {
    console.err(err);
  }
};

const getPortfolioTransaction = async (req, res, next) => {
  try {
    const data = await PortfolioTransaction.find({
      user: req.user._id,
    });

    res.status(200).json({
      status: 'Success',
      data,
    });
  } catch (err) {
    console.err(err);
  }
};

const getPortfolioCoinNames = async (req, res, next) => {
  try {
    const data = await PortfolioTransaction.find({
      user: req.user._id,
    })
      .distinct('coinName')
      //.cache(req.user._id);
    res.status(200).json({
      status: 'Success',
      data,
    });
  } catch (err) {
    console.err(err);
  }
};

const getPortfolioTransactionByCoinName = async (req, res, next) => {
  const { coinName } = req.params;
  try {
    const data = await PortfolioTransaction.find({
      user: req.user._id,
      coinName,
    })
    //.cache(req.user._id);

    res.status(200).json({
      status: 'Success',
      data,
    });
  } catch (err) {
    console.err(err);
  }
};

module.exports = {
  addToPortfolioTransaction,
  getPortfolioTransaction,
  getPortfolioTransactionByCoinName,
  getPortfolioCoinNames,
};
