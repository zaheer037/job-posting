const express = require('express');
const router = express.Router();
const { createInterview } = require('../controllers/interviewController');

// POST route to create a new interview
router.post('/create-interview', createInterview);

module.exports = router;
