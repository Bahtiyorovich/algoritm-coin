const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Pupil = require('./Pupil');

const Mentor = sequelize.define('Mentor', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  role: {
    type: DataTypes.ENUM('mentor', 'admin', 'pupil'),
    defaultValue: 'mentor'
  },
  route: {
    type: DataTypes.STRING,
    allowNull: false,
  }
})

Mentor.belongsToMany(Pupil, { through: 'TeacherPupil' });
Pupil.belongsToMany(Mentor, { through: 'TeacherPupil' });

module.exports = Mentor;