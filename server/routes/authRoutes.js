const express = require('express');
const authController = require('../controllers/authController');
const { authMiddleware } = require('../utils/jwt');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/users', authController.getAllUsers);
router.get('/user', authMiddleware, authController.getUser);

router.delete('/users/:id', authController.deleteUser);
module.exports = router;
