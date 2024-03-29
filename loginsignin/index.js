import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './config/database.js';
import authRoutes from './routes/authRoutes.js';



const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/auth', authRoutes);

sequelize.sync()
  .then(() => {
    console.log('Models synchronized with database.');
  })
  .catch(err => {
    console.error('Unable to synchronize models with database:', err);
  });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

