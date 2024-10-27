const mongoose = require('mongoose');

// Define the schema for User
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  companyEmail: {
    type: String,
    required: true,
    unique: true,
  },
  employeeSize: {
    type: Number,
    required: true,
  },
  emailOtp: {
    type: String,
    default: null,  // This will store the email OTP
  },
  phoneOtp: {
    type: String,
    default: null,  // This will store the phone OTP
  },
  isEmailVerified: {
    type: Boolean,
    default: false,  // Tracks if the email is verified
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,  // Tracks if the phone number is verified
  },
  createdAt: {
    type: Date,
    default: Date.now,  // Timestamp for when the user was created
  },
});

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
