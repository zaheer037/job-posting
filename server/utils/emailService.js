const nodemailer = require('nodemailer');
require('dotenv').config();

const sendInterviewEmail = async (candidateEmail, interviewDetails) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD, // Use App Password if 2-Step Verification is enabled
      },
    });

    let mailOptions = {
      from: process.env.EMAIL,
      to: candidateEmail,
      subject: `Interview Invitation for ${interviewDetails.jobTitle}`, // Plain text subject line
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #4CAF50;">Interview Invitation</h2>
          <p>Dear candidate,</p>
          <p>You have been invited for an interview for the position of <strong>${interviewDetails.jobTitle}</strong>. Please review the details below and submit your application before <strong>${interviewDetails.endDate}</strong>.</p>
          
          <h3 style="color: #1E90FF;">Job Details:</h3>
          <ul>
            <li><strong>Job Title:</strong> ${interviewDetails.jobTitle}</li>
            <li><strong>Experience Level:</strong> ${interviewDetails.experienceLevel}</li>
            <li><strong>Job Description:</strong> ${interviewDetails.jobDescription}</li>
          </ul>
          
          <p>Thank you, and we look forward to your application.</p>
          <p>Best regards,<br><strong>Zaheer</strong></p>
        </div>
      `,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendInterviewEmail };
