const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const interviewRoutes = require('./routes/interviewRoutes'); // Import interview routes
const otpRoutes = require('./routes/otp');

const cors = require('cors');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();


app.use(cors({
  origin: '*'
}));
// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch((err) => console.log('Error connecting to MongoDB:', err));

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api', otpRoutes);
app.get("/", (req, res) => {
  res.send("Backend running perfectly");
});
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
