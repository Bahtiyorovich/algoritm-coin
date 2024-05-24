const User = require('../models/User');
const authService = require('../services/authService');
const { body, validationResult } = require('express-validator');

exports.profile = async (req, res) => {
  try {
    const { id, username, email, role } = req.user;
    res.json({ id, username, email, role });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await authService.getAllUsers();
    res.status(201).json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

exports.register = [
  body('username').isLength({ min: 3 }).withMessage('Enter a valid username'),
  body('email').isEmail().withMessage('Enter a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, email, password } = req.body;
    try {
      const user = await authService.register(username, email, password);
      res.json({ message: 'Registration successful', user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
];

exports.login = [
  body('email').isEmail().withMessage('Enter a valid email address'),
  body('password').exists().withMessage('Password is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const token = await authService.login(email, password);
      
      // Set the authentication token as a cookie
      res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      res.json({ message: 'Login successful'});
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
];

exports.logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.json({ message: 'Logout successful' });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Sequelize yordamida ma'lumotni o'chirish
    await User.destroy({ where: { id } })
    res.json({ message: 'Ma\'lumot muvaffaqiyatli o\'chirildi '});
  } catch (error) {
    // Xatolik haqida xabar chiqarish
    console.error('Xatolik:', error);
    res.status(500).json({ error: 'Ma\'lumotni o\'chirishda xatolik yuz berdi' });
  }
}