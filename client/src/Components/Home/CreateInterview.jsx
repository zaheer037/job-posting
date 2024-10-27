import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import "./CreateInterview.css";
import Swal from 'sweetalert2';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const CreateInterview = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [showForm, setShowForm] = useState(false); // State to control form visibility
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    experienceLevel: '',
    candidateEmail: '',
    endDate: ''
  });
  
  useEffect(() => {
    // Get the user name from localStorage
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleCreateInterviewClick = () => {
    setShowForm(true); // Show form when the button is clicked
  };

  const handleCreateInterviewClickOff = () => {
    setShowForm(false);
  };

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    let validationErrors = {};

    // Job title validation
    if (!formData.jobTitle.trim()) {
      validationErrors.jobTitle = 'Job title is required';
    }

    // Job description validation
    if (!formData.jobDescription.trim()) {
      validationErrors.jobDescription = 'Job description is required';
    }

    // Experience level validation
    if (!formData.experienceLevel.trim()) {
      validationErrors.experienceLevel = 'Experience level is required';
    }

    // Candidate email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.candidateEmail.trim()) {
      validationErrors.candidateEmail = 'Candidate email is required';
    } else if (!emailPattern.test(formData.candidateEmail)) {
      validationErrors.candidateEmail = 'Please enter a valid email';
    }

    // End date validation
    if (!formData.endDate) {
      validationErrors.endDate = 'End date is required';
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0; // Return true if no errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:5000/api/interviews/create-interview', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 201) {
          setSuccessMessage('Interview created successfully');
          setFormData({
            jobTitle: '',
            jobDescription: '',
            experienceLevel: '',
            candidateEmail: '',
            endDate: ''
          });
          Swal.fire({
            title: 'Success!',
            text: 'Interview created successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        }
      } catch (error) {
        console.error('Error creating interview:', error.response ? error.response.data.message : 'Server error');
      }
    } else {
      console.log('Validation failed');
    }
  };

  const handleLogout = () => {
    // Clear user session (if stored in localStorage or cookies)
    localStorage.removeItem('userToken'); // Example of clearing user session
    navigate('/'); // Redirect to home page
  };
  return (
    <div className="main-container">
      {/* Left Sidebar */}
      <div className="sidebar">
        <FaHome className="home-icon" onClick={handleCreateInterviewClickOff} />
      </div>

      {/* Main Content */}
      <div className="content">
        {/* Header */}
        <header className="header">
          <div className="logo"><img src="https://cdn.builder.io/api/v1/image/assets/TEMP/67fb07e7aed1acee9a0c377496dd9cfd5b61610c3ac4aba07619721ec4c9a670?placeholderIfAbsent=true&apiKey=b3fe187d143142f4a43462766a1f5b1d" alt="Company Logo" className="logo" />
          </div>
          <nav className="nav">
            <span style={{ paddingRight: "30px" }}>Contact</span>
            <div className="profile">
              <span><strong>{userName ? userName : "Your Name"}</strong></span>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
          </nav>
        </header>

        {/* Create Interview Button */}
        {!showForm && (
          <div className="button-container">
            <button className="create-interview-btn" onClick={handleCreateInterviewClick}>
              Create Interview
            </button>
          </div>
        )}

        {/* Interview Form */}
        {showForm && (
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div>
                <label>Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  placeholder="Enter Job Title"
                  value={formData.jobTitle}
                  onChange={handleChange}
                />
                {errors.jobTitle && <span className="error-message">{errors.jobTitle}</span>}
              </div>
              <div>
                <label>Job Description</label>
                <textarea
                  name="jobDescription"
                  placeholder="Enter Job Description"
                  value={formData.jobDescription}
                  onChange={handleChange}
                />
                {errors.jobDescription && <span className="error-message">{errors.jobDescription}</span>}
              </div>
              <div>
                <label>Experience Level</label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                >
                  <option value="">Select Experience Level</option>
                  <option value="Junior">Junior</option>
                  <option value="Mid">Mid</option>
                  <option value="Senior">Senior</option>
                </select>
                {errors.experienceLevel && <span className="error-message">{errors.experienceLevel}</span>}
              </div>
              <div>
                <label>Add Candidate</label>
                <input
                  type="email"
                  name="candidateEmail"
                  placeholder="xyz@gmail.com"
                  value={formData.candidateEmail}
                  onChange={handleChange}
                />
                {errors.candidateEmail && <span className="error-message">{errors.candidateEmail}</span>}
              </div>
              <div>
                <label>End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                />
                {errors.endDate && <span className="error-message">{errors.endDate}</span>}
              </div>
              <button type="submit">Send</button>
              {successMessage && <p className="success-message">{successMessage}</p>}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateInterview;
