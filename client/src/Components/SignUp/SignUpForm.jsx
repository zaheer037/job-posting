import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa"; // For the green tick icon
import "./SignUpForm.css"; // Optional, if using an external CSS file
import { Link,useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Header from "../Header/Header";
import "./OtpVerification.css";
import axios from "axios";

export const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    companyName: "",
    companyEmail: "",
    employeeSize: "",
  });
  const navigate=useNavigate();
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let validationErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      validationErrors.name = "Name is required";
    }

    // Phone validation (must be numeric and 10 digits long)
    const phonePattern = /^(\+91)?[6-9][0-9]{9}$/;
    if (!formData.phone.trim()) {
      validationErrors.phone = "Phone number is required";
    } else if (!phonePattern.test(formData.phone)) {
      validationErrors.phone = "Phone number must be 10 digits";
    }

    // Company Name validation
    if (!formData.companyName.trim()) {
      validationErrors.companyName = "Company name is required";
    }

    // Email validation (basic format check)
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.companyEmail.trim()) {
      validationErrors.companyEmail = "Company email is required";
    } else if (!emailPattern.test(formData.companyEmail)) {
      validationErrors.companyEmail = "Please enter a valid email";
    }

    // Employee size validation (must be a positive number)
    if (!formData.employeeSize.trim()) {
      validationErrors.employeeSize = "Employee size is required";
    } else if (isNaN(formData.employeeSize) || parseInt(formData.employeeSize) <= 0) {
      validationErrors.employeeSize = "Employee size must be a positive number";
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
        // Step 1: Save signup data
        const response = await axios.post("http://localhost:5000/api/users/signup", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        console.log("User created successfully:", response.data);
        Swal.fire({
          title: 'Success!',
          text: 'User created successfully. Please verify your email and phone.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        // Step 2: Store email and phone in localStorage
        localStorage.setItem("signupEmail", formData.companyEmail);
        localStorage.setItem("signupPhone", formData.phone);
        localStorage.setItem("userName", formData.name);

        // Step 3: Navigate to Sign-In page for OTP verification
        navigate("/sign-in");
      } catch (error) {
        console.log("Error:", error.response ? error.response.data.message : "Server error");
      }
    } else {
      console.log("Validation failed");
    }
  };
  

  return (
    <div>
      <Header/>
    <div className="signup-container">
      <div className="left-section">
        <strong><p>
        Join Our Community!<br/><br />
        Sign up today to unlock exclusive features and connect with others.<br/> 
        </p></strong>
      </div>
      <div className="right-section">
        <form onSubmit={handleSubmit} className="signup-form">
          <h2>Sign Up</h2>
          <p>Access to personalized recommendations</p>

          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <input
              type="tel"
              name="phone"
              placeholder="Phone no."
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
            {errors.companyName && <span className="error-message">{errors.companyName}</span>}
          </div>

          <div className="form-group">
            <input
              type="email"
              name="companyEmail"
              placeholder="Company Email"
              value={formData.companyEmail}
              onChange={handleChange}
              required
            />
            {errors.companyEmail && <span className="error-message">{errors.companyEmail}</span>}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="employeeSize"
              placeholder="Employee Size"
              value={formData.employeeSize}
              onChange={handleChange}
              required
            />
            {errors.employeeSize && <span className="error-message">{errors.employeeSize}</span>}
          </div>

          <p className="terms">
            By clicking on proceed you will accept our{" "}
            <a href="#terms">Terms & Conditions</a>
          </p>
            <button type="submit" className="submit-btn">
            Proceed
            </button>
          
        </form>
      </div>
    </div>
    </div>
  );
};






export const SignIn = () => {
  const [emailOtp, setEmailOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const navigate = useNavigate();

  // Retrieve email and phone from localStorage that was set during sign-up
  useEffect(() => {
    const storedEmail = localStorage.getItem("signupEmail");
    const storedPhone = localStorage.getItem("signupPhone");
    if (storedEmail && storedPhone) {
      setEmail(storedEmail);
      setPhone(storedPhone);
    }
  }, []);

  // Handle email OTP input change
  const handleEmailOtpChange = (e) => {
    setEmailOtp(e.target.value);
  };

  // Handle phone OTP input change
  const handlePhoneOtpChange = (e) => {
    setPhoneOtp(e.target.value);
  };

  // Function to send OTP to email
  const sendEmailOtp = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post("http://localhost:5000/api/send-email-otp", { email });
      if (response.data.success) {
        console.log("Email OTP sent successfully.");
        Swal.fire({
          title: 'Success!',
          text: 'OTP has been sent',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error("Error sending email OTP:", error.response ? error.response.data.message : error.message);
      setErrorMessage("Failed to send Email OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Function to send OTP to phone
  const sendPhoneOtp = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post("http://localhost:5000/api/send-phone-otp", { phone });
      if (response.data.success) {
        console.log("Phone OTP sent successfully.");
        Swal.fire({
          title: 'Success!',
          text: 'OTP has been sent',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error("Error sending phone OTP:", error.response ? error.response.data.message : error.message);
      setErrorMessage("Failed to send Phone OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Function to verify email OTP
  const verifyEmailOtp = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post("http://localhost:5000/api/verify-email-otp", { email, otp: emailOtp });
      if (response.data.success) {
        setIsEmailVerified(true);
        console.log("Email OTP verified successfully.");
      }
    } catch (error) {
      console.error("Email OTP verification failed:", error.response ? error.response.data.message : error.message);
      setErrorMessage("Email OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  // Function to verify phone OTP
  const verifyPhoneOtp = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post("http://localhost:5000/api/verify-phone-otp", { phone, otp: phoneOtp });
      if (response.data.success) {
        setIsPhoneVerified(true);
        console.log("Phone OTP verified successfully.");
      }
    } catch (error) {
      console.error("Phone OTP verification failed:", error.response ? error.response.data.message : error.message);
      setErrorMessage("Phone OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmailVerified && isPhoneVerified) {
      console.log("Sign in successful");
      Swal.fire({
        title: 'Success!',
        text: 'Sign in successful',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      navigate("/home");  // Redirect to home page after successful OTP verification
    } else {
      setErrorMessage("Please verify both email and phone OTPs before proceeding.");
    }
  };

  return (
    <div className="otp-verification-container">
      <div className="left-section">
        <h1>Cuvette</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
      </div>
      <div className="right-section">
        <form onSubmit={handleSubmit} className="otp-verification-form">
          <h2>Sign In</h2>
          <p>Please verify your email and phone with OTPs.</p>

          {/* Email OTP Verification */}
          <div className={`form-group ${isEmailVerified ? "verified" : ""}`}>
            <input
              type="text"
              name="emailOtp"
              placeholder="Email OTP"
              value={emailOtp}
              onChange={handleEmailOtpChange}
              disabled={isEmailVerified} // Disable after verification
              required
            />
            {isEmailVerified && <FaCheckCircle className="icon-verified" />}
          </div>
          {!isEmailVerified && (
            <button type="button" onClick={verifyEmailOtp} className="verify-btn" disabled={loading}>
              Verify Email OTP
            </button>
          )}
          <button type="button" onClick={sendEmailOtp} className="send-btn" disabled={loading || isEmailVerified}>
            Send Email OTP
          </button>

          {/* Phone OTP Verification */}
          <div className={`form-group ${isPhoneVerified ? "verified" : ""}`}>
            <input
              type="text"
              name="phoneOtp"
              placeholder="Phone OTP"
              value={phoneOtp}
              onChange={handlePhoneOtpChange}
              disabled={isPhoneVerified} // Disable after verification
              required
            />
            {isPhoneVerified && <FaCheckCircle className="icon-verified" />}
          </div>
          {!isPhoneVerified && (
            <button type="button" onClick={verifyPhoneOtp} className="verify-btn" disabled={loading}>
              Verify Phone OTP
            </button>
          )}
          <button type="button" onClick={sendPhoneOtp} className="send-btn" disabled={loading || isPhoneVerified}>
            Send Phone OTP
          </button>

          {/* Error Message */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {/* Proceed Button */}
          <button type="submit" className="submit-btn" disabled={!isEmailVerified || !isPhoneVerified}>
            Proceed
          </button>
        </form>
      </div>
    </div>
  );
};


