import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./users.js";

const post = sequelize.define('posts',{
    caption:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    imageUrl:{
        type:DataTypes.STRING,
        allowNull:false,
    },
})
post.belongsTo(User);
User.hasMany(post);

export default post;