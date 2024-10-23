const express = require('express');
const router = express.Router();
const User = require('../models/User');
const generateOtp = require('../utils/otpGenerator');
const sendEmail = require('../services/emailService');  // You will need to implement this
const sendSms = require('../services/smsService');      // You will need to implement this

router.post('/send-email-otp', async (req, res) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }
  
    // Debugging log
    console.log(`Received email for OTP: ${email}`);
  
    const otp = generateOtp();
    
    try {
      const user = await User.findOneAndUpdate(
        { companyEmail: email.toLowerCase().trim() },  // Use .toLowerCase() and .trim() for case insensitivity and spaces
        { emailOtp: otp },
        { new: true }
      );
  
      if (user) {
        await sendEmail(email, `Your OTP is: ${otp}`);
        return res.status(200).json({ success: true, message: 'Email OTP sent.' });
      } else {
        return res.status(404).json({ success: false, message: 'User not found.' });
      }
    } catch (error) {
      console.error("Error in email OTP generation:", error);
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  });
router.post('/send-phone-otp', async (req, res) => {
    const { phone } = req.body;
  
    if (!phone) {
      return res.status(400).json({ success: false, message: 'Phone number is required.' });
    }
  
    // Debugging log
    console.log(`Received phone for OTP: ${phone}`);
  
    const otp = generateOtp();
  
    try {
      const user = await User.findOneAndUpdate(
        { phone: phone.trim() },  // Use .trim() to remove any extra spaces
        { phoneOtp: otp },
        { new: true }
      );
  
      if (user) {
        await sendSms(phone, `Your OTP is: ${otp}`);
        return res.status(200).json({ success: true, message: 'Phone OTP sent.' });
      } else {
        return res.status(404).json({ success: false, message: 'User not found.' });
      }
    } catch (error) {
      console.error("Error in phone OTP generation:", error);
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  });
    
// Verify Email OTP
router.post('/verify-email-otp', async (req, res) => {
  console.log(req.body); // Log incoming request data
  const { otp, email } = req.body;

  if (!otp || !email) {
    return res.status(400).json({ success: false, message: 'OTP and email are required.' });
  }

  const user = await User.findOne({ companyEmail: email });
  if (user && user.emailOtp === otp) {
    return res.status(200).json({ success: true, message: 'Email OTP verified successfully.' });
  } else {
    return res.status(400).json({ success: false, message: 'Invalid OTP or email.' });
  }
});

// Verify Phone OTP
router.post('/verify-phone-otp', async (req, res) => {
  console.log(req.body); // Log incoming request data
  const { otp, phone } = req.body;

  if (!otp || !phone) {
    return res.status(400).json({ success: false, message: 'OTP and phone number are required.' });
  }
  
  const user = await User.findOne({ phone });
  if (user && user.phoneOtp === otp) {
    return res.status(200).json({ success: true, message: 'Phone OTP verified successfully.' });
  } else {
    return res.status(400).json({ success: false, message: 'Invalid OTP or phone number.' });
  }
});


module.exports = router;
