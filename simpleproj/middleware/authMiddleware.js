import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../middleware/authMiddleware.js';

dotenv.config();

const authenticateToken = (req, res, next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.sendStatus(401);
    }
    jwt.verify(token,process.env.JWT_SECRET,async(err,decode)=>{
        if(err){
            return res.sendStatus(403);
        }
        try {
            const user = await User.findByPk(decode.userID)
            if(!user){
                return res.sendStatus(404)
            }
            req.user = user;
        } catch (error) {
            console.log("error fetching user:",error);
            return res.sendStatus(500);
        }
    })
}

export default authenticateToken;