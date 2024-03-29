import transporter from '../config/emailConfig.js';

export const sendEmail = (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: process.env.SMTP_USERNAME,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    }
  });
};