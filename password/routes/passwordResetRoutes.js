import express from 'express';
const router = express.Router();
import { forgotPassword, resetPassword } from '../controllers/passwordResetController.js';

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;