import { sendOTP } from '../services/twilioService.js';

const sendOTPController = async (req, res) => {
    const { phoneNumber } = req.body;

    try {
        const otp = await sendOTP(phoneNumber);
        res.status(200).json({ otp });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).send('Failed to send OTP');
    }
};

export { sendOTPController };
