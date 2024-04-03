import express from 'express';
import { sendOTPController } from '../controllers/otpController.js';

const router = express.Router();

router.post('/sendOTP', sendOTPController);

export default router;
