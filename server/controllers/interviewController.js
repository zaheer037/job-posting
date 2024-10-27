const Interview = require('../models/Interview');
const { sendInterviewEmail } = require('../utils/emailService');

const createInterview = async (req, res) => {
  const { jobTitle, jobDescription, experienceLevel, candidateEmail, endDate } = req.body;

  try {
    const newInterview = new Interview({
      jobTitle,
      jobDescription,
      experienceLevel,
      candidateEmail,
      endDate,
    });

    await newInterview.save();
    await sendInterviewEmail(candidateEmail, { jobTitle, jobDescription, experienceLevel, endDate });
    res.status(201).json({ message: 'Interview created and email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createInterview };
