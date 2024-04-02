import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import db from './util/database.js';
import userRoutes from './routes/userRoutes.js';
import passwordResetRoutes from './routes//passwordResetRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());


app.use('/users', userRoutes);
app.use('/password-reset', passwordResetRoutes);

db.sync()
  .then(() => {
    console.log('Models synchronized with database.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to synchronize models with database:', err);
  });
