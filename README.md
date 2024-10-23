

# Job Posting Application

A web-based application that allows companies to post job listings and manage interviews. The app offers an intuitive interface for both companies and job seekers, along with real-time OTP verification during signup. This README provides information about the setup, functionality, and deployment of the application.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Users can sign up and log in with email and phone OTP verification.
- **Company Job Posting**: Companies can create, edit, and delete job postings.
- **Interview Scheduling**: Schedule interviews and manage them with real-time notifications.
- **Responsive Design**: The app is mobile-friendly and adapts to different screen sizes.
- **Twilio OTP Integration**: Secure OTP verification for both email and phone during the signup process.
- **User-Friendly Interface**: Clean and intuitive UI for both job seekers and company representatives.

## Technologies Used

- **Frontend**: React.js, Axios, HTML5, CSS3
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **OTP Service**: Twilio (SMS OTP), Nodemailer (Email OTP)
- **Deployment**: [Vercel/Netlify for Frontend], [Heroku/Render for Backend]
- **Version Control**: Git, GitHub

## Installation

To run the project locally, follow these steps:

### Backend

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/jobPostingApplication.git
   cd jobPostingApplication/back-end
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up MongoDB**:
   Ensure that MongoDB is installed and running on your system, or use a cloud service like MongoDB Atlas.

4. **Run the backend server**:
   ```bash
   npm start
   ```

### Frontend

1. **Navigate to the frontend directory**:
   ```bash
   cd jobPostingApplication/front-end
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the frontend server**:
   ```bash
   npm start
   ```

Now, you can visit the app at `http://localhost:3000`.

## Usage

### Sign Up
- Users can sign up by entering their name, phone number, company name, and email. OTPs will be sent to verify the user's email and phone number.

### Job Posting
- Once logged in, companies can create job postings and manage their listings. The listings will be visible to job seekers.

### Interview Management
- Interviews can be scheduled by companies for specific job postings, and applicants can view their upcoming interview schedules.

## Environment Variables

To run the project, you will need to add the following environment variables:

### Backend (`.env`)
```
MONGO_URI=<Your MongoDB connection string>
JWT_SECRET=<Your JWT secret>
TWILIO_ACCOUNT_SID=<Your Twilio Account SID>
TWILIO_AUTH_TOKEN=<Your Twilio Auth Token>
TWILIO_PHONE_NUMBER=<Your Twilio Phone Number>
EMAIL_SERVICE=<Your Email service provider>
EMAIL_USER=<Your Email user>
EMAIL_PASS=<Your Email password>
```

### Frontend (`.env`)
```
REACT_APP_BACKEND_URL=<Your backend URL, e.g., http://localhost:5000>
```

## Deployment

To deploy the application:

### Frontend
1. Configure Vercel or Netlify for deployment by linking the repository.
2. Set up the environment variables (if needed).
3. Deploy the frontend.

### Backend
1. Use Heroku, Render, or another platform to deploy the backend.
2. Ensure you set the environment variables in the deployment settings.
3. Deploy the backend.

## API Endpoints

### Auth
- `POST /signup` - Register a new user (triggers OTP verification).
- `POST /login` - Authenticate the user and return a JWT token.

### OTP Verification
- `POST /send-email-otp` - Send OTP to user's email.
- `POST /send-phone-otp` - Send OTP to user's phone.
- `POST /verify-email-otp` - Verify the OTP sent to the user's email.
- `POST /verify-phone-otp` - Verify the OTP sent to the user's phone.

### Jobs
- `POST /jobs` - Create a new job posting.


### Interviews
- `POST /interviews` - Schedule an interview.

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License.

---

This README file outlines the core details of your project and provides instructions on how to set it up, run, and contribute.
