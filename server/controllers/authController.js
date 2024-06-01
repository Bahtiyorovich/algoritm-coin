const authService = require('../services/authService');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();


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

exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const findusername = await User.findOne({where: {username}});
      const finduseremail = await User.findOne({where: { email}});
      if(findusername) res.status(401).send({message: 'This username already exists'});
      if(finduseremail) res.status(401).send({message: 'This user email already exists'});
      if(!findusername || !finduseremail){
        const user = await authService.register(username, email, password);
        res.status(201).json(user);
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user || !await bcrypt.compare(password, user.password)) res.status(401).send({message: 'Invalid email or password'});
      authService.createAndSaveToken(user, res);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

exports.logout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(400).json({ error: 'Error logging out' });
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