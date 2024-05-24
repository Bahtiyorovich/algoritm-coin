const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/profile', authMiddleware(['user', 'admin', 'pupil']), authController.profile);
router.get('/users', authController.getAllUsers);
router.delete('/users/:id', authController.deleteUser);
module.exports = router;
