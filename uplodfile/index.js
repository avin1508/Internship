import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use('/api/users', userRoutes);

sequelize.sync().then(() => {
    console.log('Database synchronized');
}).catch(error => {
    console.error('Error synchronizing database:', error);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
