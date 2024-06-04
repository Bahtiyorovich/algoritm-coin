const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getAllAdmins = async () => {
  const users = await Admin.findAll();
  return users;
};

exports.register = async (username, email, password) => {
  const user = await Admin.create({ username, email, password });
  return user;
};

exports.createAndSaveToken = (user, res) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // faqat https orqali yuborish
      sameSite: 'strict',
      maxAge: 3600000 // 1 soat
    });
}