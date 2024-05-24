const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();

// Validate environment variables
const PORT = process.env.PORT || 3000;
if (!process.env.PORT) {
  console.error('PORT environment variable is not set. Defaulting to 3000.');
}

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/api/auth', authRoutes);

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
