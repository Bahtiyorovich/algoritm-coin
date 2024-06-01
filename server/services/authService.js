const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

exports.register = async (username, email, password) => {
  const user = await User.create({ username, email, password });
  return user;
};

exports.createAndSaveToken = (user, res) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, {
    httpOnly: true,
  });
}