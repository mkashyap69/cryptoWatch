const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const { promisify } = require('util');

const signToken = (userId) => {
  var token = jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: '7d',
  });

  return token;
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(404).json({
      status: 'Error',
      message: 'Please provide email or password',
    });
    return;
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    res.status(404).json({
      status: 'Error',
      message: 'Password or email id is incorrect',
    });
    return;
  }

  const correct = await user.compare(password, user.password);

  if (!correct) {
    res.status(404).json({
      status: 'Error',
      message: 'Password or email id is incorrect',
    });
    return;
  }

  const token = signToken(user._id);
  user.password = undefined;

  res.cookie('ID', token, {
    httpOnly: true,
    secure: false,
    // process.env.NODE_ENV === 'production' ? true :
    maxAge: 1 * 60 * 60 * 1000,
  });

  res.status(200).json({
    status: 'Success',
    token,
    data: user,
  });
};

const getUserByCookies = async (req, res, next) => {
  if (req.cookies.ID) {
    jwt.verify = promisify(jwt.verify);
    const decoded = await jwt.verify(req.cookies.ID, process.env.SECRET_KEY);

    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(404).json({
        status: 'Error',
        message: 'Session Expired!!! Please login again',
      });
      return;
    }
    res.status(200).json({
      status: 'Success',
      token: req.cookies.ID,
      data: user,
    });
  } else {
    res.status(404).json({
      status: 'Error',
      message: 'Please login',
    });
  }
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, password });
    const token = signToken(user._id);
    user.password = undefined;

    res.status(201).json({
      status: 'Success',
      token,
      data: user,
    });
  } catch (e) {
    res.status(200).json({
      status: 'Failure',
      message: e.message,
    });
  }
};

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(404).json({
      status: 'Error',
      message: 'You are not authorized to access this',
    });
  }
  jwt.verify = promisify(jwt.verify);
  const decoded = await jwt.verify(token, process.env.SECRET_KEY);
  const user = await User.findById(decoded.userId);
  if (!user) {
    res.status(404).json({
      status: 'Error',
      message: 'The user belonging to the token no longer exist',
    });
    return;
  }
  req.user = user;

  next();
};

const logout = async (req, res, next) => {
  res.clearCookie('ID');
  res.send('done');
};

module.exports = { login, protect, signup, getUserByCookies, logout };
