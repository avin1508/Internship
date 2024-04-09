
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('mysdata', {
    username: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    profilePic: {
        type: DataTypes.STRING
    }
}, {
    timestamps: true 
});

export default User;
