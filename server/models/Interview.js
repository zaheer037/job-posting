const mongoose = require('mongoose');

// Define the Interview Schema
const InterviewSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
    trim: true
  },
  jobDescription: {
    type: String,
    required: true,
    trim: true
  },
  experienceLevel: {
    type: String,
    required: true,
    enum: ['Fresher', 'Junior', 'Mid', 'Senior'], // Add more experience levels as needed
  },
  candidateEmail: {
    type: String,
    required: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  endDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Interview model
const Interview = mongoose.model('Interview', InterviewSchema);

module.exports = Interview;
