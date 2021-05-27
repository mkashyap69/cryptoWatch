const express = require('express');
const authController = require('../controller/authController');
const {
  addToWatchList,
  getWatchListData,
  renderWatchListData,
} = require('../controller/userController');
const clearCache = require('../middleware/clearCache');

const Router = express.Router();

Router.route('/:coinId').post(
  authController.protect,
  clearCache,
  addToWatchList
);
Router.route('/watchList').get(authController.protect, getWatchListData);
Router.route('/renderWatchList').get(
  authController.protect,
  renderWatchListData
);

module.exports = Router;
