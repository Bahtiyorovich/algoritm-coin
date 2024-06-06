const authService = require('../services/authService');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

exports.getAllAdmins = async (req, res) => {
  try {
    const users = await authService.getAllAdmins();
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAdmin = async (req, res) => {
    const { id } = req.params;
  try {
    const user = await Admin.findByPk(id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const findusername = await Admin.findOne({where: {username}});
      const finduseremail = await Admin.findOne({where: { email}});
      if(findusername) res.status(401).send({message: 'This username already exists'});
      if(finduseremail) res.status(401).send({message: 'This user email already exists'});
      if(!findusername || !finduseremail){
        const user = await authService.register(username, email, password);
        res.status(201).json({admin: user});
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await Admin.findOne({ where: { email } });
      if (!user || !await bcrypt.compare(password, user.password)) res.status(401).send({message: 'Invalid email or password'});
      authService.createAndSaveToken(user, res);
      res.status(200).json({ message: 'Login muvaffaqiyatli', admin: user });
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

exports.deleteAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    await Admin.destroy({ where: { id } });
    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error deleting user' });
  }
};