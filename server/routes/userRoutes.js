const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Handle POST request for user sign up
router.post('/signup', async (req, res) => {
  const { name, phone, companyName, companyEmail, employeeSize } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ companyEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create a new user
    const newUser = new User({
      name,
      phone,
      companyName,
      companyEmail,
      employeeSize,
    });

    // Save user to the database
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
