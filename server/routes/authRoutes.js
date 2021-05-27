const express = require('express');
const authController = require('../controller/authController');

const Router = express.Router();

Router.route('/login').post(authController.login);
Router.route('/user').get(authController.getUserByCookies);
Router.route('/logoutUser').get(authController.protect, authController.logout);
Router.route('/signup').post(authController.signup);

module.exports = Router;
