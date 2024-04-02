import { DataTypes } from 'sequelize';
import db from '../util/database.js';

const ResetPassword = db.define('resetPassword', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: true
  },
  otpExpiry: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  timestamps: true
});

export default ResetPassword;
