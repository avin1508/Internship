import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import otpRoutes from './routes/otpRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());


app.use("/OTP",otpRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
