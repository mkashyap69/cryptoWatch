const express = require('express');
const {
  getCryptoDataFromAPI,
  getCryptoDataFromDB,
  setCryptoDataToDB,
} = require('../controller/cryptoDataController');
const { protect } = require('../controller/authController');

const Router = express.Router();

Router.route('/dbData/:id').get(protect,getCryptoDataFromDB);
Router.route('/apiData').get(protect, getCryptoDataFromAPI);

module.exports = Router;
