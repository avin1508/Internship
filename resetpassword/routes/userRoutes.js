import express from 'express';
import { createUser, resetPassword, softDeleteUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/user', createUser);
router.put('/user/reset-password', resetPassword);
router.delete('/user/:id', softDeleteUser);

export default router;
