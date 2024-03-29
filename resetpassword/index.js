import express from 'express'
import dotenv from 'dotenv'
import sequelize from './config/database.js';
import userRouter from './routes/userRoutes.js'
import bodyparser from 'body-parser'

dotenv.config();

const PORT = process.env.PORT||3000;



const app = express();
app.use(bodyparser.json());


app.use('/api',userRouter)


sequelize.sync().then(()=>{
    console.log("model is sync with database");
}).catch((err)=>{
    console.log("error while connecting with database",err)
});

app.listen(PORT,(req,res) =>{
    console.log(`server is listening at ${PORT}`)
})