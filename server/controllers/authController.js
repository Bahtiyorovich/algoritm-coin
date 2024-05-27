const { body, validationResult } = require('express-validator');
const authService = require('../services/authService');
const User = require('../models/User');


exports.getAllUsers = async (req, res) => {
  try {
    const users = await authService.getAllUsers();
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getUser = async (req, res ) => {
  const { id } = req.params;
  try {
    const user = await authService.getUser(id)
    if(!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.register = [
  body('username').isLength({ min: 3 }).withMessage('Enter a valid username'),
  body('email').isEmail().withMessage('Enter a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, password } = req.body;
    try {
      const {user, token} = await authService.register(username, email, password);
      res.cookie('token', token, {
        maxAge: 900000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
      res.status(201).json({ message: 'Registration successful', user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
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
      const {user, token} = await authService.login(email, password);
      res.cookie('token', token, {
        maxAge: 900000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      res.status(400).json({ error: 'Invalid email or password' });
    }
  }
];

exports.logout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ error: 'Error logging out' });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.destroy({ where: { id } });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error deleting user' });
  }
};