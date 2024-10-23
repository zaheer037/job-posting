const nodemailer = require('nodemailer');
require('dotenv').config();
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
        pass: process.env.PASSWORD,          // replace with your email password
  },
});

const sendEmail = (candidateEmail, content) => {
  return transporter.sendMail({
    from:process.env.EMAIL,
    to: candidateEmail,
    subject: 'OTP Verification',
    text: content,
  });
};

module.exports = sendEmail;
