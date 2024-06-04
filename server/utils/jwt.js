const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    if (!res.headersSent) {
      next();  // Faqat javob yuborilmagan bo'lsa next() chaqiriladi
    }
  } catch (e) {
    if (!res.headersSent) {
      res.status(401).json({ error: 'Iltimos, autentifikatsiyadan o‘ting.' });
    }
  }
};


