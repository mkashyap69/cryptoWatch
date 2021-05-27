const mongoose = require('mongoose');
var validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'] },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: [validator.isEmail, 'Please provide a valid email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false,
  },
  portfolio: [Number],
  watchlist: [Number],
});

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.compare = async (inputPassword, dbPassword) => {
  const res = await bcrypt.compare(inputPassword, dbPassword);

  return res;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
