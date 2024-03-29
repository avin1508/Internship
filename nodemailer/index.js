import express from 'express';
import dotenv from 'dotenv';
import emailRoutes from './routes/emailRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', emailRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});