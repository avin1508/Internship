import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import authRoute from './routes/authRoutes.js'
import profileRoute from './routes/profileRoutes.js'
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/auth',authRoute);
app.use('/info',profileRoute);

sequelize.sync().then(()=>{
    console.log("model sync with database")
}).catch(err =>{
    console.log("some thing error  while making the connection with the database")
})

app.listen(PORT,(req,res) =>{
    console.log(`server is running at ${PORT}`)
})

