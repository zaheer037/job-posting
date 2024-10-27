
---

# Job Posting Application

**Live Demo:** https://jobpostingapp.netlify.app/

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Conclusion](#conclusion)

## Introduction

Welcome to **Job Posting Application**! This is a full-stack web application where companies can post job listings and manage applications. Built using the MERN (MongoDB, Express, React, Node.js) stack, the project allows both users and admins to manage job listings dynamically. 

## Features

- User registration and authentication with OTP verification (via email and phone).
- Dynamic job posting and editing features.
- Admin dashboard to manage users and job listings.
- Responsive and user-friendly interface.
- Real-time OTP validation for secure login.
  
## Tech Stack

- **Frontend:** React, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** OTP Verification (Email & Phone) with Twilio
- **Deployment:** Heroku for Backend, Vercel for Frontend

## Installation & Setup

### Prerequisites

- Node.js & npm installed.
- MongoDB instance running locally or cloud-based.

### Clone the Repository

```bash
git clone https://github.com/yourusername/job-posting-app.git
cd job-posting-app
```

### Install Dependencies

For the backend:
```bash
cd backend
npm install
```

For the frontend:
```bash
cd frontend
npm install
```

### Environment Variables

You need to set up `.env` files for both the backend and frontend. 

#### Backend `.env`
```bash
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
TWILIO_ACCOUNT_SID=<your-twilio-account-sid>
TWILIO_AUTH_TOKEN=<your-twilio-auth-token>
TWILIO_PHONE_NUMBER=<your-twilio-phone-number>
```

#### Frontend `.env`
```bash
REACT_APP_BACKEND_URL=<your-backend-url>
```

### Run the Application

For the backend:
```bash
cd backend
npm run dev
```

For the frontend:
```bash
cd frontend
npm start
```

## Usage

Once the project is running, you can:

1. Register a new company account.
2. Verify your phone and email OTPs.
3. Post jobs, manage listings, and track applications.

## API Endpoints

- `POST /send-email-otp`: Sends OTP to the email for verification.
- `POST /send-phone-otp`: Sends OTP to the phone number for verification.
- `POST /verify-email-otp`: Verifies the email OTP.
- `POST /verify-phone-otp`: Verifies the phone OTP.

## Deployment

The application is deployed on:

- **Frontend:** Vercel
- **Backend:** Heroku

To access the live version, click [here](Insert Your Live Link).

## Conclusion

This project demonstrates a secure job posting application with features like OTP verification and dynamic job management. Feel free to fork the repository, add features, or report any issues. Thank you for checking out the Job Posting Application!

---

This README can be modified based on your specific deployment details and project specifics. Be sure to include the actual live link when it's ready.
