const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const mentorRoutes = require('./routes/mentorRoutes');
const pupilsRoutes = require('./routes/pupilsRoutes');
const { authenticate } = require('./middlewares/authMiddleware');
require('dotenv').config();

const app = express();

// Validate environment variables
const PORT = process.env.PORT || 5000;
if (!process.env.PORT) {
  console.error('PORT environment variable is not set. Defaulting to 5000.');
}

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use(authenticate);
// routes
app.use('/api/auth', authRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/pupils', pupilsRoutes);

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
